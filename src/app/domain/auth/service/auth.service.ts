import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  UsersRequestSingIn,
  UsersResponse,
} from '../interface/users.interface';
import { LIST_OF_USERS } from './../../../shared/constants/list-of-users.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  id: number = 0;

  getUsers(): Observable<UsersResponse[]> {
    return of(LIST_OF_USERS);
  }
  getOneUser(id: number) {
    const user = LIST_OF_USERS.find((value) => value.id === id);

    if (!user) return;
    return user;
  }

  login(user: UsersRequestSingIn) {
    const { name, password } = user;
    const findUser = LIST_OF_USERS.find(
      (user) => user.name === name && user.password === password
    );

    return findUser;
  }
  singUp(users: UsersResponse) {
    const findUser = LIST_OF_USERS.find((user) => user === users);
    if (users !== findUser) {
      LIST_OF_USERS.push({ ...users, id: ++this.id });
    } else {
      LIST_OF_USERS;
    }

    return LIST_OF_USERS;
  }
}
