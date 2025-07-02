import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import ApolloCreateServer from "./graphql/index";
import UserService from "./services/user";

//simply creating & integrating apollo server

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());

  const server = await ApolloCreateServer();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        //@ts-ignore
        const token=req.headers["token"];
        try {
          const user=UserService.decodeJWTToken(token as string);
          return {user};

          
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.use(express.json());

  //   const port = process.env.PORT || 3000;
  app.listen(8000, () => {
    console.log("server is running ");
  });
}

startServer();
