import * as bcrypt from 'bcrypt';

export const mockUser = {
  username: 'Name',
  email: 'email@youapp.test',
  password: bcrypt.hash('password', 10),
};
