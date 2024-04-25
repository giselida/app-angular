import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LIST_OF_USERS } from '../../../shared/constants/list-of-users.constant';
import {
  UsersRequestSingIn,
  UsersResponse,
} from '../interface/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  getUsers(): UsersResponse[] {
    return LIST_OF_USERS;
  }
  getOneUser(id: string) {
    const user = LIST_OF_USERS.find((value) => value.id == id);
    return of(user);
  }
  login(user: UsersRequestSingIn) {
    const { name, password } = user;
    const findUser = LIST_OF_USERS.find(
      (user) => user.name === name && user.password === password
    );

    console.log(findUser);
    return findUser!;
  }
  singUp(user: UsersResponse) {
    const users = LIST_OF_USERS.push(user);
    if (!users) return;
    return users;
  }
}
