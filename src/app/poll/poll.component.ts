import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PollService,
  PollInfo,
  PollOptionInfo,
  PollVoteInfo,
} from './poll.service';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  Color,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

interface VoteForm {
  [voteOption: string]: any;
}

@Component({
  selector: 'gp-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
})
export class PollComponent implements OnInit {
  error = '';
  poll: PollInfo = {};
  pollOptions: PollOptionInfo[] = [];
  pollVotes: PollVoteInfo[] = [];
  selectedOption = 0;

  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[] = [];
  pieChartData: SingleDataSet = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartColors: Color[] = [];

  constructor(
    private pollService: PollService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    this.pieChartColors = [this.generateColors(5)];
    this.updateInfo();
  }

  select(event: MouseEvent) {
    this.selectedOption = parseInt(
      (event.target as HTMLElement).id.split('-')[1]
    );
  }

  onVoteSubmit() {
    this.pollService
      .pollVote(this.selectedOption)
      .then((_) => this.updateInfo())
      .catch((err) => (this.error = err));
  }

  updateInfo() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const pollID = parseInt(paramMap.get('pollID') || '');

      if (isNaN(pollID)) {
        this.error = 'Missing value for pollID';
      } else {
        Promise.all([
          this.pollService.getPollInfo(pollID),
          this.pollService.getPollOptions(pollID),
          this.pollService.getPollVotes(pollID),
          this.pollService.getUserVote(pollID),
        ])
          .then(([pollInfo, pollOptions, pollVotes, userVote]) => {
            this.poll = pollInfo;
            this.pollOptions = pollOptions;
            this.pollVotes = pollVotes;
            this.selectedOption = userVote.poll_option_id as number;

            this.updateVoteInfo();
          })
          .catch((err) => (this.error = err));
      }
    });
  }

  updateVoteInfo() {
    this.pieChartLabels = this.pollOptions.map(
      (option) => option.value as string
    );
    this.pieChartData = this.pollOptions.map(
      (option) =>
        this.pollVotes.filter((vote) => vote.poll_option_id === option.id)
          .length
    );
  }

  private generateColors(numColors: number): Color {
    return {
      backgroundColor: Array.from(Array(numColors).keys()).map(
        (value) => `hsl(${Math.round(value * 137.508) % 360}, 100%, 50%)`
      ),
    };
  }
}
