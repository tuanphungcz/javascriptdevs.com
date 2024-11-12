import { User } from "payload-types";

export const initUsers: User[] = [
  {
    id: "1",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    firstName: "Admin",
    lastName: "User",
    email: "admin@withpayload.com",
    username: "adminuser",
    role: "admin",
    password: process.env.ADMIN_PASSWORD,
  },
  {
    id: "2",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    firstName: "User 1",
    lastName: "User",
    email: "user@withpayload.com",
    password: "test",
    username: "user1",
    role: "user",
  },
];
