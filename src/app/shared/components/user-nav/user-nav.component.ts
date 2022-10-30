import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss'],
})
export class UserNavComponent implements OnInit {
  @Input() user;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  public logout() {
    this.authService.logout().subscribe(
      () => {
        this.authService.clearStorage();
        this.route.navigate(['/login']);
      },
      () => {
        this.authService.clearStorage();
        this.route.navigate(['/login']);
      }
    );
  }
}
