// This is supposed to emulate whatever storage would be used
// in the app. I decided to use MobX because I simply wanted
// to try it. We'll only need one store for user info
import { observable } from 'mobx-react-lite';

export const user = observable({
  firstName: '',
  lastName: '',
  updateUserInfo({ firstName, lastName }) {
    this.firstName = firstName;
    this.lastName = lastName;
  },
});
