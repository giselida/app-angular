import { Injectable } from '@angular/core';
import { find, from, Observable, of } from 'rxjs';
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
    const list = of(LIST_OF_USERS);

    return list;
  }
  getOneUser(id: number) {
    const list = from(LIST_OF_USERS).pipe(find((value) => value.id === id));

    if (!list) return;
    return list;
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
