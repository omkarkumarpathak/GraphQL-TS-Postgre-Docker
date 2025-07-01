"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
const node_crypto_1 = require("node:crypto");
class UserService {
    static createUser(payload) {
        const { firstName, lastName, profileImageURL, email, password } = payload;
        const salt = (0, node_crypto_1.randomBytes)(32).toString('hex');
        const hashedPassword = (0, node_crypto_1.createHmac)("sha256", salt)
            .update(password)
            .digest("hex");
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                profileImageURL,
                email,
                salt,
                password: hashedPassword,
            },
        });
    }
}
exports.default = UserService;
