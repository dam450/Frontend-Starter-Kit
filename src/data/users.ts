enum Role {
  Admin = 'admin',
  User = 'user',
}

type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  image: string;
};

const users: User[] = [
  {
    id: '1',
    email: 'user1@email.com',
    password: '123456',
    name: 'User 1',
    role: Role.User,
    image: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
  },
  {
    id: '2',
    email: 'user2@email.com',
    password: '123456',
    name: 'User 2',
    role: Role.Admin,
    image: 'https://randomuser.me/api/portraits/thumb/lego/2.jpg',
  },
  {
    id: '3',
    email: 'user3@email.com',
    password: '123456',
    name: 'User 3',
    role: Role.User,
    image: 'https://randomuser.me/api/portraits/thumb/lego/3.jpg',
  },
];

export const getUserByEmail = (email: string): Promise<User | undefined> => {
  const foundUser = users.find((user) => user.email === email);
  return new Promise((resolve) => setTimeout(resolve, 1000, foundUser));
};
