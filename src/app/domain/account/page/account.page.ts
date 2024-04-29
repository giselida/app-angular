import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { UsersRequestSingUp } from '../../auth/interface/users.interface';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './account.page.html',
  styleUrl: './account.page.scss',
})
export class AccountPage implements OnInit {
  user: UsersRequestSingUp = JSON.parse(localStorage.getItem('user') ?? '{}');
  userService = inject(UserService);
  ngOnInit(): void {
    console.log(this.user);
  }
}
