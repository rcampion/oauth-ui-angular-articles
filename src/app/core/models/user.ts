import * as _ from 'lodash';

import { Authority } from './authority';

export class User {

    id: string;

    login: string;

    userName: string;

    password: string;

    firstName: string;

    lastName: string;

    enabled: string;

    email: string;

    bio: string;

    image: string;

    isLoggedIn: boolean;

  constructor(user?: { id: number,
    login: string,
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    enabled: string,
    email: string,
    bio: string,
    image: string,
    isLoggedIn: boolean
     }) {
    if (user) {
      _.assignIn(this, user);
      // this.authenticated = false;
    }
  }
}
