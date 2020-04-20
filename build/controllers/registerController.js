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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var oracledb_1 = __importDefault(require("oracledb"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var conexion = {
    user: "alie",
    password: "alie",
    connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};
var RegisterController = /** @class */ (function () {
    function RegisterController() {
        this.SECRET_KEY = 'alie-sell';
        /*  enviarCorreo(req:Request,res:Response){
           const TXTUSER='kvothe.11294@gmail.com';
           const TXTCLAVE='kVothe11294@';
           
           console.log(TXTUSER);
           const correo='pabloramirez.11294@gmail.com';
           let transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: TXTUSER,
                 pass: TXTCLAVE
             }
           });
           let mail_options = {
             from: TXTUSER,
             to: correo,
             subject: `Bienvenido `,
             html: `
                 <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                 <tr height="200px">
                     <td bgcolor="" width="600px">
                         <h1 style="color: #fff; text-align:center">Bienvenido a Alie Sell</h1>
                         <p  style="color: #fff; text-align:center">
                             <span style="color: #e84393">${TXTUSER}</span>
                             a la aplicación
                         </p>
                     </td>
                 </tr>
                 <tr bgcolor="#fff">
                     <td style="text-align:center">
                         <p style="color: #000">Para confirmar su cuenta selecciones el siguiente enlace.</p>
                     </td>
                 </tr>
                 </table>
             
             `
             };
             transporter.sendMail(mail_options, (error, info) => {
               if (error) {
                   console.log(error);
               } else {
                   console.log('El correo se envío correctamente ' + info.response);
               }
             });
             res.status(200).send('enviado');
     
         } */
    }
    RegisterController.prototype.run = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, result, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 9]);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("SELECT * FROM usuario")];
                    case 2:
                        result = _a.sent();
                        // console.log(result.rows);
                        // res.send(JSON.stringify(result.rows));
                        res.json(result.rows);
                        return [3 /*break*/, 9];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        res.status(409).send({ message: 'Problema al listar.' });
                        return [3 /*break*/, 9];
                    case 4:
                        if (!connection) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, connection.close()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        console.error(err_2);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 8];
                    case 8: return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, salt, hash, result, txt, txt2, _id, expiresIn, accessToken, dataU, link, TXTUSER, TXTCLAVE, transporter, mail_options, err_3, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = bcryptjs_1.default.genSaltSync(10);
                        hash = bcryptjs_1.default.hashSync(req.body.clave, salt);
                        req.body.clave = hash;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 12]);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 2:
                        connection = _a.sent();
                        /*
                        await connection.execute('insert into cliente values(:idbv, :cbv)',
                        { idbv: 1001, cbv: 'jose ortega' } );
                        await connection.execute('commit');*/
                        console.log(req.body);
                        return [4 /*yield*/, connection.execute('insert into usuario(id_usuario,nombre,apellidos,clave,correo,telefono) '
                                + 'values(pk_usuario.nextval, :nombre,:apellidos,:clave,:correo,:telefono)', req.body)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connection.execute('commit')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, connection.execute("BEGIN\n              SELECT id_usuario INTO :id_u FROM usuario WHERE correo = :correo;\n            END;", {
                                correo: req.body.correo,
                                id_u: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER, maxSize: 40 },
                            })];
                    case 5:
                        result = _a.sent();
                        txt = result;
                        txt2 = txt.outBinds;
                        _id = txt2.id_u;
                        expiresIn = 24 * 60 * 60;
                        accessToken = jsonwebtoken_1.default.sign({ _id: _id }, 'alie-sell');
                        dataU = {
                            correo: req.body.correo,
                            accessToken: accessToken
                        };
                        link = "http://localhost:3000/register/confirmar/" + accessToken;
                        TXTUSER = 'kvothe.11294@gmail.com';
                        TXTCLAVE = 'kVothe11294@';
                        transporter = nodemailer_1.default.createTransport({
                            service: 'gmail',
                            auth: {
                                user: TXTUSER,
                                pass: TXTCLAVE
                            }
                        });
                        mail_options = {
                            from: TXTUSER,
                            to: dataU.correo,
                            subject: "Bienvenido ",
                            html: "\n              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600px\" background-color=\"#2d3436\" bgcolor=\"#2d3436\">\n              <tr height=\"200px\">  \n                  <td bgcolor=\"\" width=\"600px\">\n                      <h1 style=\"color: #fff; text-align:center\">Bienvenido a Alie Sell</h1>\n                      <p  style=\"color: #fff; text-align:center\">\n                          <span style=\"color: #e84393\">" + req.body.nombre + "</span> \n                          a la aplicaci\u00F3n\n                      </p>\n                  </td>\n              </tr>\n              <tr bgcolor=\"#fff\">\n                  <td style=\"text-align:center\">\n                      <p style=\"color: #000\">Para confirmar su cuenta selecciones el siguiente enlace: " + link + "</p>\n                  </td>\n              </tr>\n              </table>\n          \n          "
                        };
                        transporter.sendMail(mail_options, function (error, info) {
                            if (error) {
                                console.log(error);
                                res.status(409).send({ message: 'Error al mandar el correo.' });
                            }
                            else {
                                console.log('El correo se envío correctamente ' + info.response);
                            }
                        });
                        //*********************************TERMINA CORREO */
                        res.status(200).send({ dataU: dataU });
                        return [3 /*break*/, 12];
                    case 6:
                        err_3 = _a.sent();
                        console.error(err_3);
                        res.status(409).send({ message: 'Problema al registrarse.' });
                        return [3 /*break*/, 12];
                    case 7:
                        if (!connection) return [3 /*break*/, 11];
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, connection.close()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        err_4 = _a.sent();
                        console.error(err_4);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 11];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, userData, result, txt, txt2, txt3, _id, resultPassword, accessToken, dataU, err_5, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {
                            correo: req.body.correo,
                            clave: req.body.clave
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 10]);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("BEGIN\n               SELECT clave INTO :clave FROM usuario WHERE correo = :correo;\n               SELECT id_usuario INTO :id_u FROM usuario WHERE correo = :correo;\n               SELECT confirmacion INTO :conf FROM usuario WHERE correo = :correo;\n             END;", {
                                correo: userData.correo,
                                clave: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.STRING, maxSize: 100 },
                                id_u: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER, maxSize: 20 },
                                conf: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER, maxSize: 1 }
                            })];
                    case 3:
                        result = _a.sent();
                        txt = result;
                        txt2 = txt.outBinds;
                        txt3 = txt2.clave;
                        _id = txt2.id_u;
                        //const fila:any=JSON.stringify(result.outBinds);
                        if (txt2.conf == 0) {
                            res.status(409).send({ message: 'Correo no autenticado.' });
                            return [2 /*return*/];
                        }
                        resultPassword = bcryptjs_1.default.compareSync(userData.clave, txt3);
                        if (resultPassword) {
                            accessToken = jsonwebtoken_1.default.sign({ _id: _id }, 'alie-sell');
                            dataU = {
                                name: req.body.name,
                                correo: req.body.correo,
                                accessToken: accessToken
                            };
                            res.status(200).send({ dataU: dataU });
                        }
                        else {
                            // password wrong
                            res.status(409).send({ message: 'Contraseña invalida.' });
                        }
                        return [3 /*break*/, 10];
                    case 4:
                        err_5 = _a.sent();
                        if (err_5.errorNum === 1403)
                            res.status(409).send({ message: 'Correo no existe.' });
                        else
                            res.status(409).send({ message: 'Problema al logearse.' });
                        console.error(err_5);
                        return [3 /*break*/, 10];
                    case 5:
                        if (!connection) return [3 /*break*/, 9];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, connection.close()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_6 = _a.sent();
                        console.error(err_6);
                        res.status(409).send({ message: 'Problema al cerra la conexión.' });
                        return [3 /*break*/, 9];
                    case 9: return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.confirmarCorreo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, id, txt_id, result, err_7, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 14]);
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(id, 'alie-sell')];
                    case 2:
                        txt_id = _a.sent();
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 3:
                        //console.log(id);
                        //console.log(txt_id._id);
                        //res.status(200).send(req.params);
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("update usuario set confirmacion = :val1 where id_usuario=:valId", {
                                val1: 1,
                                valId: txt_id._id
                            })];
                    case 4:
                        result = _a.sent();
                        if (!(result.rowsAffected == 0)) return [3 /*break*/, 5];
                        res.status(409).send({ message: 'Problema al confirmar correo, no encontro al usuario.' });
                        return [3 /*break*/, 7];
                    case 5:
                        console.log(result);
                        return [4 /*yield*/, connection.execute('commit')];
                    case 6:
                        _a.sent();
                        res.status(200).redirect('http://localhost:4200/login');
                        _a.label = 7;
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        err_7 = _a.sent();
                        console.error(err_7);
                        res.status(409).send({ message: 'Problema al confirmar correo.' });
                        return [3 /*break*/, 14];
                    case 9:
                        if (!connection) return [3 /*break*/, 13];
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, connection.close()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        err_8 = _a.sent();
                        console.error(err_8);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 13];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return RegisterController;
}());
exports.registerController = new RegisterController();
