import { User } from "../typings/user";

export const users: User[] = [
  {
    id: 1,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan@sender.com",
    password: "jan123",
    role: "sender",
    createdAt: new Date(),
  },
];
