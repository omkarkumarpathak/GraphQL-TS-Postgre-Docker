import { prismaClient } from "../../lib/db";
import axios from "axios";

const queries = {
  getToDo: async () =>
    (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
};

const mutations = {
  createUser: async (
    _: any,
    {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
  ) => {
    await prismaClient.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        salt: "random_salt",
      },
    });

    return "randomId";
  },
};

export const resolvers = { queries, mutations };
