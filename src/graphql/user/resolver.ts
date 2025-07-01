import { prismaClient } from "../../lib/db";
import axios from "axios";
import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
  getToDo: async () =>
    (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
};

const mutations = {
  createUser: async (_: any, payload:CreateUserPayload)=>{
  
    const res=await UserService.createUser(payload);

    return res.id;
    
  },
};

export const resolvers = { queries, mutations };
