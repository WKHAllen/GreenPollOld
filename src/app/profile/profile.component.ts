import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'gp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private profileService: ProfileService) {}
}
