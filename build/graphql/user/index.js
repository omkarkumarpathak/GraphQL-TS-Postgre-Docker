"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typedef_1 = require("./typedef");
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
const resolver_1 = require("./resolver");
exports.User = { typeDefs: typedef_1.typeDefs, queries: queries_1.queries, mutations: mutations_1.mutations, resolvers: resolver_1.resolvers };
