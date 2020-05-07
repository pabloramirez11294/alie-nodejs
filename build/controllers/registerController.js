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
    }
    RegisterController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            function getRandomCredit(min, max) {
                var n = Math.floor(Math.random() * (max - min)) + min;
                var res;
                switch (n) {
                    case 1:
                        res = 50000.00;
                        break;
                    case 2:
                        res = 25000.00;
                        break;
                    case 3:
                        res = 10000.00;
                        break;
                    case 4:
                        res = 5000.00;
                        break;
                    default:
                        res = 1000.00;
                }
                return res;
            }
            var connection, salt, hash, credito, fechaArreglada, result, txt, txt2, _id, expiresIn, accessToken, dataU, link, TXTUSER, TXTCLAVE, transporter, mail_options, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = bcryptjs_1.default.genSaltSync(10);
                        hash = bcryptjs_1.default.hashSync(req.body.clave, salt);
                        req.body.clave = hash;
                        credito = getRandomCredit(1, 5);
                        req.body.credito = credito;
                        req.body.ganancia = 0.00;
                        req.body.estado = 1;
                        fechaArreglada = function (fecha) {
                            var separador = fecha.split(" ");
                            var year = separador[3];
                            var mes = separador[1];
                            var dia = separador[2];
                            var numMes;
                            switch (mes) {
                                case "Jan":
                                    numMes = 1;
                                    break;
                                case "Feb":
                                    numMes = 2;
                                    break;
                                case "Mar":
                                    numMes = 3;
                                    break;
                                case "Apr":
                                    numMes = 4;
                                    break;
                                case "May":
                                    numMes = 5;
                                    break;
                                case "Jun":
                                    numMes = 6;
                                    break;
                                case "Jul":
                                    numMes = 7;
                                    break;
                                case "Aug":
                                    numMes = 8;
                                    break;
                                case "Sep":
                                    numMes = 9;
                                    break;
                                case "Oct":
                                    numMes = 10;
                                    break;
                                case "Nov":
                                    numMes = 11;
                                    break;
                                case "Dec":
                                    numMes = 12;
                                    break;
                                default:
                                    numMes = 1;
                            }
                            var fechaArreglada = dia + "-" + numMes + "-" + year;
                            return fechaArreglada;
                        };
                        req.body.fecha_reg = fechaArreglada(new Date().toDateString());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 12]);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 2:
                        // console.log(req.body);   
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute('insert into usuario(id_usuario,nombre,apellidos,clave,correo,telefono,fecha_nac,fecha_reg,genero,direccion,clase,credito,ganancia,estado) '
                                + 'values(pk_usuario.nextval, :nombre,:apellidos,:clave,:correo,:telefono,:fecha_nac,:fecha_reg,'
                                + ':genero,:direccion,\'cliente\',:credito,:ganancia,:estado)', req.body, { autoCommit: true })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connection.execute("BEGIN\n              SELECT id_usuario INTO :id_u FROM usuario WHERE correo = :correo and ROWNUM = 1;\n            END;", {
                                correo: req.body.correo,
                                id_u: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER, maxSize: 40 },
                            })];
                    case 4:
                        result = _a.sent();
                        txt = result;
                        txt2 = txt.outBinds;
                        _id = txt2.id_u;
                        expiresIn = 24 * 60 * 60;
                        //const accessToken = jwt.sign({nombre:req.body.id_usuario},'alie-sell',{expiresIn:expiresIn});
                        /* const dataU={
                          correo:req.body.correo,
                          accessToken:accessToken,
                          expireIns:expiresIn
                        } */
                        return [4 /*yield*/, connection.execute('insert into carrito values(pk_carrito.nextval,:id)', { id: _id }, { autoCommit: true })];
                    case 5:
                        //const accessToken = jwt.sign({nombre:req.body.id_usuario},'alie-sell',{expiresIn:expiresIn});
                        /* const dataU={
                          correo:req.body.correo,
                          accessToken:accessToken,
                          expireIns:expiresIn
                        } */
                        _a.sent();
                        accessToken = jsonwebtoken_1.default.sign({ _id: _id }, 'alie-sell');
                        dataU = {
                            correo: req.body.correo,
                            accessToken: accessToken
                        };
                        link = "http://localhost:3000/register/confirmar/" + accessToken;
                        TXTUSER = process.env.MAILUSER;
                        TXTCLAVE = process.env.MAILPASSWD;
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
                            html: "\n              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600px\" background-color=\"#96F726\" bgcolor=\"#cddf89\">\n              <tr height=\"150px\">  \n                  <td width=\"750px\">\n                      <h1 style=\"color: #0000FF; text-align:center\">Bienvenido a Alie Sell</h1>\n                      <p  style=\"color: #0000FF; text-align:center\">\n                          <span style=\"color: #FF0000\">" + req.body.nombre + "</span>                           \n                      </p>\n                  </td>\n              </tr>\n              <tr bgcolor=\"#EB5E27\">\n                  <td style=\"text-align:center\">\n                      <p style=\"color: #FDFCFC\">Para confirmar su cuenta selecciones el siguiente enlace: " + link + "</p>\n                  </td>\n              </tr>\n              </table>          \n          "
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
                        err_1 = _a.sent();
                        console.error(err_1);
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
                        err_2 = _a.sent();
                        console.error(err_2);
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
            var connection, userData, result, txt, txt2, txt3, _id, clase, resultPassword, accessToken, dataU, err_3, err_4;
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
                        return [4 /*yield*/, connection.execute("BEGIN\n               SELECT clave INTO :clave FROM usuario WHERE correo = :correo AND estado=1;\n               SELECT id_usuario INTO :id_u FROM usuario WHERE correo = :correo AND estado=1;\n               SELECT confirmacion INTO :conf FROM usuario WHERE correo = :correo AND estado=1;\n               SELECT clase INTO :clase FROM usuario WHERE correo = :correo AND estado=1;\n             END;", {
                                correo: userData.correo,
                                clave: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.STRING, maxSize: 100 },
                                id_u: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER, maxSize: 20 },
                                conf: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER, maxSize: 1 },
                                clase: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.STRING, maxSize: 20 }
                            })];
                    case 3:
                        result = _a.sent();
                        txt = result;
                        txt2 = txt.outBinds;
                        txt3 = txt2.clave;
                        _id = txt2.id_u;
                        clase = txt2.clase;
                        //const fila:any=JSON.stringify(result.outBinds);
                        if (txt2.conf == null || txt2.conf == 0) {
                            res.status(409).send({ message: 'Correo no autenticado.' });
                            return [2 /*return*/];
                        }
                        resultPassword = bcryptjs_1.default.compareSync(userData.clave, txt3);
                        if (resultPassword) {
                            accessToken = jsonwebtoken_1.default.sign({ _id: _id }, 'alie-sell');
                            dataU = {
                                name: req.body.name,
                                correo: req.body.correo,
                                accessToken: accessToken,
                                clase: clase
                            };
                            res.status(200).send({ dataU: dataU });
                        }
                        else {
                            // password wrong
                            res.status(409).send({ message: 'Contraseña invalida.' });
                        }
                        return [3 /*break*/, 10];
                    case 4:
                        err_3 = _a.sent();
                        if (err_3.errorNum === 1403)
                            res.status(409).send({ message: 'Correo no existe.' });
                        else
                            res.status(409).send({ message: 'Problema al logearse.' });
                        console.error(err_3);
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
                        err_4 = _a.sent();
                        console.error(err_4);
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
            var connection, id, txt_id, result, err_5, err_6;
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
                        err_5 = _a.sent();
                        console.error(err_5);
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
                        err_6 = _a.sent();
                        console.error(err_6);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 13];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.getUsuarios = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, result, err_7, err_8;
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
                        err_7 = _a.sent();
                        console.error(err_7);
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
                        err_8 = _a.sent();
                        console.error(err_8);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 8];
                    case 8: return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.adminActualizar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, id_operador, txt_id, txtEstado, err_9, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_operador = req.body.id_operador;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 12]);
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(id_operador, 'alie-sell')];
                    case 2:
                        txt_id = _a.sent();
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 3:
                        connection = _a.sent();
                        req.body.id_operador = txt_id._id;
                        console.log(req.body);
                        txtEstado = "";
                        if (req.body.estado == 1) {
                            txtEstado = 'alta';
                        }
                        else if (req.body.estado == 0) {
                            txtEstado = 'congelar';
                        }
                        else {
                            txtEstado = 'baja';
                        }
                        return [4 /*yield*/, connection.execute("BEGIN\n          update usuario set clase=:clase, estado=:estado where id_usuario=:id_usuario;\n          insertarBitacora(:id_operador,:id_usuario,concat(concat(:clase,' - '),'" + txtEstado + "'),:descripcion);\n        END;          \n        ", req.body)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, connection.execute("commit")];
                    case 5:
                        _a.sent();
                        res.status(200).send({ message: "Se actualizo el usuario." });
                        return [3 /*break*/, 12];
                    case 6:
                        err_9 = _a.sent();
                        console.error(err_9);
                        res.status(409).send({ message: "Problema adminActualizar." });
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
                        err_10 = _a.sent();
                        console.error(err_10);
                        res.status(409).send({ message: "Error al cerrar la conexión." });
                        return [3 /*break*/, 11];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.adminRegistro = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, claveLegible, salt, hash, fechaArreglada, TXTUSER, TXTCLAVE, transporter, mail_options, err_11, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        claveLegible = req.body.clave;
                        salt = bcryptjs_1.default.genSaltSync(10);
                        hash = bcryptjs_1.default.hashSync(req.body.clave, salt);
                        req.body.clave = hash;
                        req.body.estado = 1;
                        fechaArreglada = function (fecha) {
                            var separador = fecha.split(" ");
                            var year = separador[3];
                            var mes = separador[1];
                            var dia = separador[2];
                            var numMes;
                            switch (mes) {
                                case "Jan":
                                    numMes = 1;
                                    break;
                                case "Feb":
                                    numMes = 2;
                                    break;
                                case "Mar":
                                    numMes = 3;
                                    break;
                                case "Apr":
                                    numMes = 4;
                                    break;
                                case "May":
                                    numMes = 5;
                                    break;
                                case "Jun":
                                    numMes = 6;
                                    break;
                                case "Jul":
                                    numMes = 7;
                                    break;
                                case "Aug":
                                    numMes = 8;
                                    break;
                                case "Sep":
                                    numMes = 9;
                                    break;
                                case "Oct":
                                    numMes = 10;
                                    break;
                                case "Nov":
                                    numMes = 11;
                                    break;
                                case "Dec":
                                    numMes = 12;
                                    break;
                                default:
                                    numMes = 1;
                            }
                            var fechaArreglada = dia + "-" + numMes + "-" + year;
                            return fechaArreglada;
                        };
                        req.body.fecha_reg = fechaArreglada(new Date().toDateString());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 10]);
                        console.log(req.body);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute('insert into usuario(id_usuario,nombre,clave,correo,fecha_nac,fecha_reg,genero,clase,estado,confirmacion) '
                                + 'values(pk_usuario.nextval, :nombre,:clave,:correo,:fecha_nac,:fecha_reg,'
                                + ':genero,:clase,:estado,1)', req.body, { autoCommit: true })];
                    case 3:
                        _a.sent();
                        TXTUSER = process.env.MAILUSER;
                        TXTCLAVE = process.env.MAILPASSWD;
                        transporter = nodemailer_1.default.createTransport({
                            service: 'gmail',
                            auth: {
                                user: TXTUSER,
                                pass: TXTCLAVE
                            }
                        });
                        mail_options = {
                            from: TXTUSER,
                            to: req.body.correo,
                            subject: "Bienvenido ",
                            html: "\n              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600px\" background-color=\"#96F726\" bgcolor=\"#cddf89\">\n              <tr height=\"150px\">  \n                  <td width=\"750px\">\n                      <h1 style=\"color: #0000FF; text-align:center\">Bienvenido a Alie Sell</h1>\n                      <p  style=\"color: #0000FF; text-align:center\">\n                          <span style=\"color: #FF0000\">" + req.body.correo + "</span>                           \n                      </p>\n                  </td>\n              </tr>\n              <tr bgcolor=\"#EB5E27\">\n                  <td style=\"text-align:center\">\n                      <p style=\"color: #FDFCFC\">Clave acceso:" + claveLegible + " </p>\n                  </td>\n              </tr>\n              </table>          \n          "
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
                        res.status(200).send({ message: 'Registrado' });
                        return [3 /*break*/, 10];
                    case 4:
                        err_11 = _a.sent();
                        console.error(err_11);
                        res.status(409).send({ message: 'Problema al registrarse.' });
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
                        err_12 = _a.sent();
                        console.error(err_12);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 9];
                    case 9: return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.getBitacora = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, id, txt_id, result, err_13, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 11]);
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(id, 'alie-sell')];
                    case 2:
                        txt_id = _a.sent();
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 3:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("SELECT * FROM bitacora where id_operador=:valId", {
                                valId: txt_id._id
                            })];
                    case 4:
                        result = _a.sent();
                        res.json(result.rows);
                        return [3 /*break*/, 11];
                    case 5:
                        err_13 = _a.sent();
                        console.error(err_13);
                        res.status(409).send({ message: 'Problema al listar bitacora.' });
                        return [3 /*break*/, 11];
                    case 6:
                        if (!connection) return [3 /*break*/, 10];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, connection.close()];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_14 = _a.sent();
                        console.error(err_14);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 10];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.getUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, id, txt_id, result, err_15, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 11]);
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(id, 'alie-sell')];
                    case 2:
                        txt_id = _a.sent();
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 3:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("SELECT * FROM usuario where id_usuario=:valId AND estado=1 AND ROWNUM=1", {
                                valId: txt_id._id
                            })];
                    case 4:
                        result = _a.sent();
                        res.json(result.rows);
                        return [3 /*break*/, 11];
                    case 5:
                        err_15 = _a.sent();
                        console.error(err_15);
                        res.status(409).send({ message: 'Problema abtener usuario.' });
                        return [3 /*break*/, 11];
                    case 6:
                        if (!connection) return [3 /*break*/, 10];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, connection.close()];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_16 = _a.sent();
                        console.error(err_16);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 10];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.actualizarUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, id, salt, hash, txt_id, err_17, err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body.id_usuario;
                        console.log(req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 12]);
                        if (req.body.clave.length < 30) {
                            salt = bcryptjs_1.default.genSaltSync(10);
                            hash = bcryptjs_1.default.hashSync(req.body.clave, salt);
                            req.body.clave = hash;
                        }
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(id, 'alie-sell')];
                    case 2:
                        txt_id = _a.sent();
                        req.body.id_usuario = txt_id._id;
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 3:
                        connection = _a.sent();
                        console.log(req.body);
                        return [4 /*yield*/, connection.execute("UPDATE usuario set nombre=:nombre, apellidos=:apellidos,\n                      correo=:correo, clave=:clave, telefono=:telefono \n                      WHERE id_usuario=:id_usuario", req.body)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, connection.execute("commit")];
                    case 5:
                        _a.sent();
                        res.status(200).send({ message: 'Se actualizaron sus datos.' });
                        return [3 /*break*/, 12];
                    case 6:
                        err_17 = _a.sent();
                        console.error(err_17);
                        res.status(409).send({ message: 'Problema abtener usuario.' });
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
                        err_18 = _a.sent();
                        console.error(err_18);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 11];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    RegisterController.prototype.olvidoPass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, provisional, salt, hash, result, TXTUSER, TXTCLAVE, transporter, mail_options, txt, txt2, _id, err_19, err_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 11]);
                        provisional = 'Pass123@';
                        salt = bcryptjs_1.default.genSaltSync(10);
                        hash = bcryptjs_1.default.hashSync(provisional, salt);
                        req.body.clave = hash;
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("BEGIN\n             SELECT id_usuario INTO :id_u FROM usuario WHERE correo = :correo AND estado=1;             \n           END;", {
                                correo: req.body.correo,
                                id_u: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER, maxSize: 20 },
                            })];
                    case 3:
                        result = _a.sent();
                        TXTUSER = process.env.MAILUSER;
                        TXTCLAVE = process.env.MAILPASSWD;
                        transporter = nodemailer_1.default.createTransport({
                            service: 'gmail',
                            auth: {
                                user: TXTUSER,
                                pass: TXTCLAVE
                            }
                        });
                        mail_options = {
                            from: TXTUSER,
                            to: req.body.correo,
                            subject: "Bienvenido ",
                            html: "\n              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600px\" background-color=\"#96F726\" bgcolor=\"#cddf89\">\n              <tr height=\"150px\">  \n                  <td width=\"750px\">\n                      <h1 style=\"color: #0000FF; text-align:center\">Bienvenido a Alie Sell</h1>\n                      <p  style=\"color: #0000FF; text-align:center\">\n                          <span style=\"color: #FF0000\">" + req.body.correo + "</span>                           \n                      </p>\n                  </td>\n              </tr>\n              <tr bgcolor=\"#EB5E27\">\n                  <td style=\"text-align:center\">\n                      <p style=\"color: #FDFCFC\">Clave acceso provisional: " + provisional + " </p>\n                  </td>\n              </tr>\n              </table>          \n          "
                        };
                        transporter.sendMail(mail_options, function (error, info) {
                            if (error) {
                                console.log(error);
                                //res.status(409).send({ message: 'Error al mandar el correo.' });
                            }
                            else {
                                console.log('El correo se envío correctamente ' + info.response);
                            }
                        });
                        txt = result;
                        txt2 = txt.outBinds;
                        _id = txt2.id_u;
                        console.log(req.body, 'ssssssssssssssssssssss');
                        return [4 /*yield*/, connection.execute("BEGIN\n                      UPDATE usuario set clave=:clave WHERE correo=:correo;\n                      commit;\n                      olvidoPass(:id_usuario,'$2a$10$1ZZ7iKzmHQx8pUN4KK8hmO6p6y6qBtRGHT1/WadgwQefmmaaUgp9e');\n                    END;    \n                      ", {
                                clave: req.body.clave,
                                correo: req.body.correo,
                                id_usuario: _id
                            })];
                    case 4:
                        _a.sent();
                        res.status(200).send({ message: 'Revise su correo.' });
                        return [3 /*break*/, 11];
                    case 5:
                        err_19 = _a.sent();
                        console.error(err_19);
                        res.status(409).send({ message: 'Problema recuperar contraseña.' });
                        return [3 /*break*/, 11];
                    case 6:
                        if (!connection) return [3 /*break*/, 10];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, connection.close()];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_20 = _a.sent();
                        console.error(err_20);
                        res.status(409).send({ message: 'Error al cerrar la conexión.' });
                        return [3 /*break*/, 10];
                    case 10: return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return RegisterController;
}());
exports.registerController = new RegisterController();
