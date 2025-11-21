"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWorker = void 0;
// users.ts
const path = __importStar(require("path"));
const Datastore = require("nedb");
class UserWorker {
    // Construtor que inicializa a base de dados NeDB e define o ficheiro onde os dados serão armazenados.
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "users.db"),
            autoload: true,
        });
    }
    // Procura um utilizador pelo email. Retorna o utilizador correspondente ou null se não existir.
    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, doc) => {
                if (err)
                    reject(err);
                else
                    resolve(doc);
            });
        });
    }
    // Procura um utilizador pelo ID. Retorna o utilizador correspondente ou null se não existir.
    findUserById(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, (err, doc) => {
                if (err)
                    reject(err);
                else
                    resolve(doc);
            });
        });
    }
    // Cria um novo utilizador na base de dados e retorna o utilizador criado.
    createUser(user) {
        return new Promise((resolve, reject) => {
            this.db.insert(user, (err, newDoc) => {
                if (err)
                    reject(err);
                else
                    resolve(newDoc);
            });
        });
    }
    // Atualiza as informações de um utilizador existente na base de dados com base no seu ID.
    updateUser(userId, updates) {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: userId }, { $set: updates }, {}, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    // Remove um utilizador da base de dados com base no seu ID.
    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: userId }, {}, (err, numRemoved) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    // Ativa um utilizador utilizando o token de confirmação, definindo o estado `isActive` como true.
    activateUser(token) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ confirmationToken: token }, (err, doc) => {
                if (err)
                    reject(err);
                else if (doc) {
                    this.db.update({ _id: doc._id }, { $set: { isActive: true, confirmationToken: "" } }, {}, (updateErr) => {
                        if (updateErr)
                            reject(updateErr);
                        else
                            resolve(doc);
                    });
                }
                else {
                    resolve(null);
                }
            });
        });
    }
}
exports.UserWorker = UserWorker;
