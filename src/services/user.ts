import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  profileImageURL?: string;
  email: string;
  password: string;
}

class UserService {
  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, profileImageURL,email, password } = payload;

    const salt = randomBytes(32).toString('hex');

    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        profileImageURL,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }
}

export default UserService;
