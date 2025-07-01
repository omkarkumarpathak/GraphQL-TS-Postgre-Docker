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
exports.resolvers = void 0;
const db_1 = require("../../lib/db");
const axios_1 = __importDefault(require("axios"));
const queries = {
    getToDo: () => __awaiter(void 0, void 0, void 0, function* () { return (yield axios_1.default.get("https://jsonplaceholder.typicode.com/todos")).data; }),
};
const mutations = {
    createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, email, password, }) {
        yield db_1.prismaClient.user.create({
            data: {
                email,
                firstName,
                lastName,
                password,
                salt: "random_salt",
            },
        });
        return "randomId";
    }),
};
exports.resolvers = { queries, mutations };
