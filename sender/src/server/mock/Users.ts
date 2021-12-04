import { User } from "../typings/user";
import { v4 as uuidv4 } from "uuid";

const createSender = (count: number): User => ({
  id: uuidv4(),
  firstName: "Jan",
  lastName: "Sender",
  email: `jan${count}@sender.com`,
  password: "jan123",
  role: "sender",
  createdAt: new Date(),
});

const createBiker = (count: number): User => ({
  id: uuidv4(),
  firstName: "Jan",
  lastName: "Biker",
  email: `jan${count}@biker.com`,
  password: "jan123",
  role: "biker",
  createdAt: new Date(),
});

const _users: User[] = [];
for (let i = 0; i < 10; i++) {
  _users.push(createSender(i));
  _users.push(createBiker(i));
}

export const users = _users;
