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
const axios_1 = __importDefault(require("axios"));
const server_1 = require("@apollo/server");
const user_1 = require("./user");
//creating apollo server and exporting
function ApolloCreateServer() {
    return __awaiter(this, void 0, void 0, function* () {
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
              ${user_1.User.queries}
          }
        
          type Mutation{
            ${user_1.User.mutations}
          }
 
        `,
            resolvers: {
                ToDO: {
                    user: (todo) => __awaiter(this, void 0, void 0, function* () {
                        return (yield axios_1.default.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data;
                    }),
                },
                Query: Object.assign({}, user_1.User.resolvers.queries),
                Mutation: Object.assign({}, user_1.User.resolvers.mutations),
            },
        });
        yield server.start();
        return server;
    });
}
exports.default = ApolloCreateServer;
