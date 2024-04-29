import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LIST_OF_USERS } from '../../../shared/constants/list-of-users.constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getOneUser(id: number) {
    const user = LIST_OF_USERS.find((value) => value.id == id);
    return of(user);
  }
}
