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
exports.URLController = void 0;
const URL_1 = require("../database/model/URL");
const shortid_1 = __importDefault(require("shortid"));
const Constants_1 = require("../config/Constants");
class URLController {
    shorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originalUrl } = req.body;
            const url = yield URL_1.URLModel.findOne({ originalUrl });
            if (url) {
                res.json(url);
                return;
            }
            const hash = shortid_1.default.generate();
            const shortUrl = `${Constants_1.config.API_URL}/${hash}`;
            const newUrl = yield URL_1.URLModel.create({ originalUrl, hash, shortUrl });
            res.json(newUrl);
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            const url = yield URL_1.URLModel.findOne({ hash });
            if (url) {
                res.redirect(url.originalUrl);
                return;
            }
            res.status(400).json({ error: "URL not found" });
        });
    }
}
exports.URLController = URLController;
//# sourceMappingURL=URLController.js.map