import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

async function startServer() {
  
  const app = express();
  app.use(express.json());

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
              getToDo : [ToDO] 
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
        getToDo: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
       // getUser: async () =>
         // (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.use(express.json());
  //   const port = process.env.PORT || 3000;
  app.listen(8000, () => {
    console.log("server is running ");
  });
}

startServer();