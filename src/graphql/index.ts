import axios from "axios";
import { ApolloServer } from "@apollo/server";
import { User } from "./user";

//creating apollo server and exporting

async function ApolloCreateServer() {
  const server = new ApolloServer({
    typeDefs: `

          ${User.typeDefs}
 
         
          type Query {
              ${User.queries}
          }    
        
          type Mutation{
            ${User.mutations}
          }
 
        `,
    resolvers: {

       
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
