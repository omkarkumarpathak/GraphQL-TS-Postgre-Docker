import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import ApolloCreateServer from './graphql/index'

//simply creating & integrating apollo server

async function startServer() {

  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());

  const server= await ApolloCreateServer(); 
  app.use("/graphql", expressMiddleware(server));

  app.use(express.json());

  //   const port = process.env.PORT || 3000;
  app.listen(8000, () => {
    console.log("server is running ");
  });
}

startServer();
  