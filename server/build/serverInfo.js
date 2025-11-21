"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Lê o arquivo serverInfo.json do sistema de ficheiros para obter as configurações do servidor SMTP.
// O caminho relativo é resolvido com base no diretório atual.
const rawInfo = fs_1.default.readFileSync(path_1.default.join(__dirname, "../server/serverInfo.json"), "utf8");
// Converte a string JSON lida do arquivo em um objeto JavaScript e armazena em serverInfo.
exports.serverInfo = JSON.parse(rawInfo);
