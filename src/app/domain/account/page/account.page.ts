import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StorageService } from '../../../shared/services/storage/storage.service';
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
export class AccountPage {
  storageService = inject(StorageService);
  user: UsersRequestSingUp = JSON.parse(
    this.storageService.getItem('user') ?? '{}'
  );
  userService = inject(UserService);
}
