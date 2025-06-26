"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        const server = new server_1.ApolloServer({
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
                    user: (todo) => __awaiter(this, void 0, void 0, function* () {
                        return (yield axios_1.default.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data;
                    }),
                },
                Query: {
                    getToDo: () => __awaiter(this, void 0, void 0, function* () { return (yield axios_1.default.get("https://jsonplaceholder.typicode.com/todos")).data; }),
                    // getUser: async () =>
                    // (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                },
            },
        });
        app.use(body_parser_1.default.json());
        app.use((0, cors_1.default)());
        yield server.start();
        app.use("/graphql", (0, express4_1.expressMiddleware)(server));
        app.use(express_1.default.json());
        //   const port = process.env.PORT || 3000;
        app.listen(8000, () => {
            console.log("server is running ");
        });
    });
}
startServer();
