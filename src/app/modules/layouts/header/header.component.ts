import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  public getUserInfo() {
    this.authService.getMe().subscribe((res) => {
      this.user = res;
    });
  }
}
