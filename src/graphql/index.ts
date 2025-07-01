import axios from "axios";
import { ApolloServer } from "@apollo/server";
import { User } from "./user";

//creating apollo server and exporting

async function ApolloCreateServer() {
  const server = new ApolloServer({
    typeDefs: `
          type User{
              id:ID!
              name:String!
          }   

          type ToDO{ 
              id : ID!
              title : String!
              completed : Boolean!
              user: User
          }

          type Query {
              ${User.queries}
          }
        
          type Mutation{
            ${User.mutations}
          }
 
        `,
    resolvers: {
      ToDO: {
        user: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            )
          ).data,
      },

      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await server.start();
  return server;
}

export default ApolloCreateServer;
