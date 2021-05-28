import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL, GenericResponse } from '../util';

export interface PollInfo {
  id?: number;
  user_id?: number;
  title?: string;
  description?: string;
  create_time?: number;
  error?: string;
}

export interface PollOption {
  id: number;
  poll_id: number;
  value: string;
}

export interface PollVote {
  id: number;
  user_id: number;
  poll_id: number;
  poll_option_id: number;
  vote_time: number;
}

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private http: HttpClient) {}

  public async createPoll(
    title: string,
    description: string
  ): Promise<PollInfo> {
    return new Promise((resolve, reject) => {
      this.http
        .get<PollInfo>(APIURL + '/create_poll', {
          params: { title, description },
          withCredentials: true,
        })
        .subscribe((res) => {
          if (!res.error) {
            resolve(res);
          } else {
            reject(res.error);
          }
        });
    });
  }

  public async getPollInfo(pollID: number): Promise<PollInfo> {
    return new Promise((resolve, reject) => {
      this.http
        .get<PollInfo>(APIURL + '/get_poll_info', {
          params: { poll_id: pollID },
          withCredentials: true,
        })
        .subscribe((res) => {
          if (!res.error) {
            resolve(res);
          } else {
            reject(res.error);
          }
        });
    });
  }

  public async getPollOptions(pollID: number): Promise<PollOption[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<PollOption[]>(APIURL + '/get_poll_options', {
          params: { poll_id: pollID },
          withCredentials: true,
        })
        .subscribe((res) => {
          if (!('error' in res)) {
            resolve(res);
          } else {
            reject(res['error']);
          }
        });
    });
  }

  public async getPollVotes(pollID: number): Promise<PollVote[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<PollVote[]>(APIURL + '/get_poll_votes', {
          params: { poll_id: pollID },
          withCredentials: true,
        })
        .subscribe((res) => {
          if (!('error' in res)) {
            resolve(res);
          } else {
            reject(res['error']);
          }
        });
    });
  }

  public async setPollTitle(pollID: number, title: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<GenericResponse>(APIURL + '/set_poll_title', {
          params: { poll_id: pollID, title },
          withCredentials: true,
        })
        .subscribe((res) => {
          if (!res.error) {
            resolve();
          } else {
            reject(res.error);
          }
        });
    });
  }

  public async setPollDescription(
    pollID: number,
    description: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<GenericResponse>(APIURL + '/set_poll_description', {
          params: { poll_id: pollID, description },
          withCredentials: true,
        })
        .subscribe((res) => {
          if (!res.error) {
            resolve();
          } else {
            reject(res.error);
          }
        });
    });
  }

  public async deletePoll(pollID: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get<GenericResponse>(APIURL + '/delete_poll', {
          params: { poll_id: pollID },
          withCredentials: true,
        })
        .subscribe((res) => {
          if (!res.error) {
            resolve();
          } else {
            reject(res.error);
          }
        });
    });
  }
}
