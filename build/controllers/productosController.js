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
var conexion = {
    user: "alie",
    password: "alie",
    connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};
var producto = {
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: 1,
    fecha_publicacion: '',
    cantidad: 1,
    color: '',
    estado: 1,
    id_categoria: 0,
    id_usuario: 0
};
var ProductosController = /** @class */ (function () {
    function ProductosController() {
    }
    ProductosController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, txtCategoria, categorias, txt_id, primero, _id, _i, categorias_1, cat, result, txt, txt2, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txtCategoria = req.body.categoria;
                        categorias = txtCategoria.split("-");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, 13, 18]);
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(req.body.id_usuario, "alie-sell")];
                    case 2:
                        txt_id = _a.sent();
                        producto.nombre = req.body.nombre;
                        producto.imagen = req.body.imagen;
                        producto.descripcion = req.body.descripcion;
                        producto.precio = req.body.precio;
                        producto.fecha_publicacion = req.body.fecha_publicacion;
                        producto.cantidad = req.body.cantidad;
                        producto.color = req.body.color;
                        producto.estado = req.body.estado;
                        producto.id_usuario = txt_id._id;
                        console.log(producto, categorias);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 3:
                        connection = _a.sent();
                        primero = true;
                        _id = 0;
                        if (!(categorias[0] !== "")) return [3 /*break*/, 9];
                        _i = 0, categorias_1 = categorias;
                        _a.label = 4;
                    case 4:
                        if (!(_i < categorias_1.length)) return [3 /*break*/, 9];
                        cat = categorias_1[_i];
                        if (!primero) return [3 /*break*/, 6];
                        primero = false;
                        return [4 /*yield*/, connection.execute("INSERT INTO categoria VALUES (pk_categoria.nextval,:nombre,null) RETURN id_categoria INTO :id", {
                                nombre: cat,
                                id: { type: oracledb_1.default.NUMBER, dir: oracledb_1.default.BIND_OUT },
                            }, { autoCommit: true })];
                    case 5:
                        result = _a.sent();
                        txt = result;
                        txt2 = txt.outBinds;
                        _id = txt2.id[0];
                        producto.id_categoria = _id;
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, connection.execute("INSERT INTO categoria VALUES (pk_categoria.nextval,:categoria,:id)", { categoria: cat, id: _id })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 4];
                    case 9: return [4 /*yield*/, connection.execute("INSERT INTO PRODUCTO values(pk_producto.nextval,:nombre,:imagen,:descripcion,:precio," +
                            ":fecha_publicacion,:cantidad,:color,:estado,:id_categoria,:id_usuario)", producto)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, connection.execute("commit")];
                    case 11:
                        _a.sent();
                        res.status(200).send({ message: "Producto guardado" });
                        return [3 /*break*/, 18];
                    case 12:
                        err_1 = _a.sent();
                        console.error(err_1);
                        res.status(409).send({ message: "Problema al crear producto." });
                        return [3 /*break*/, 18];
                    case 13:
                        if (!connection) return [3 /*break*/, 17];
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, connection.close()];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        err_2 = _a.sent();
                        console.error(err_2);
                        res.status(409).send({ message: "Error al cerrar la conexión." });
                        return [3 /*break*/, 17];
                    case 17: return [7 /*endfinally*/];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    ProductosController.prototype.eliminar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, err_3, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 10]);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 1:
                        connection = _a.sent();
                        console.log(req.body);
                        return [4 /*yield*/, connection.execute("update producto set estado=0 where codigo=:cod", req.body)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, connection.execute("commit")];
                    case 3:
                        _a.sent();
                        res.status(200).send({ message: "Producto eliminado" });
                        return [3 /*break*/, 10];
                    case 4:
                        err_3 = _a.sent();
                        console.error(err_3);
                        res.status(409).send({ message: "Problema al eliminar producto." });
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
                        res.status(409).send({ message: "Error al cerrar la conexión." });
                        return [3 /*break*/, 9];
                    case 9: return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ProductosController.prototype.listar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, id, _id, result, err_5, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 10]);
                        id = req.params.id;
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(id, "alie-sell")];
                    case 1:
                        _id = (_a.sent())._id;
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("SELECT * FROM producto WHERE estado=1 AND id_usuario=:id", { id: _id })];
                    case 3:
                        result = _a.sent();
                        res.status(200).send(result.rows);
                        return [3 /*break*/, 10];
                    case 4:
                        err_5 = _a.sent();
                        console.error(err_5);
                        res.status(409).send({ message: "Problema al listar productos." });
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
                        res.status(409).send({ message: "Error al cerrar la conexión." });
                        return [3 /*break*/, 9];
                    case 9: return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ProductosController.prototype.buscar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, nombre, result, err_7, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 9]);
                        nombre = req.params.nombre;
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.execute("SELECT * FROM producto WHERE estado=1 AND nombre like '%" + nombre + "%'")];
                    case 2:
                        result = _a.sent();
                        res.status(200).send(result.rows);
                        return [3 /*break*/, 9];
                    case 3:
                        err_7 = _a.sent();
                        console.error(err_7);
                        res.status(409).send({ message: "Problema al buscar productos." });
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
                        res.status(409).send({ message: "Error al cerrar la conexión." });
                        return [3 /*break*/, 8];
                    case 8: return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProductosController.prototype.cargarImagen = function (req, res) {
        return res.status(200).json({
            message: "Imagen guardada.",
            imagePath: req.file.path,
        });
    };
    ProductosController.prototype.cargaMasiva = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, _a, texto, id_usuario, tuplas, txt_id, _i, tuplas_1, tupla, campos, fechaArreglada, txtCategoria, categorias, primero, _id, _b, categorias_2, cat, result, txt, txt2, err_9, err_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, texto = _a.texto, id_usuario = _a.id_usuario;
                        tuplas = texto.split("\n");
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(id_usuario, "alie-sell")];
                    case 1:
                        txt_id = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 15, 16, 21]);
                        return [4 /*yield*/, oracledb_1.default.getConnection(conexion)];
                    case 3:
                        connection = _c.sent();
                        _i = 0, tuplas_1 = tuplas;
                        _c.label = 4;
                    case 4:
                        if (!(_i < tuplas_1.length)) return [3 /*break*/, 14];
                        tupla = tuplas_1[_i];
                        campos = tupla.split(",");
                        // console.log(campos);
                        producto.nombre = campos[0];
                        producto.imagen = campos[1];
                        producto.descripcion = campos[2];
                        producto.precio = Number.parseFloat(campos[3]);
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
                        producto.fecha_publicacion = fechaArreglada(new Date().toDateString());
                        producto.cantidad = Number.parseInt(campos[4]);
                        producto.color = campos[5];
                        producto.estado = 1;
                        producto.id_usuario = txt_id._id;
                        txtCategoria = campos[6];
                        categorias = txtCategoria.split("-");
                        primero = true;
                        _id = 0;
                        if (!(categorias[0] !== "")) return [3 /*break*/, 10];
                        _b = 0, categorias_2 = categorias;
                        _c.label = 5;
                    case 5:
                        if (!(_b < categorias_2.length)) return [3 /*break*/, 10];
                        cat = categorias_2[_b];
                        if (!primero) return [3 /*break*/, 7];
                        primero = false;
                        return [4 /*yield*/, connection.execute("INSERT INTO categoria VALUES (pk_categoria.nextval,:nombre,null) RETURN id_categoria INTO :id", {
                                nombre: cat,
                                id: { type: oracledb_1.default.NUMBER, dir: oracledb_1.default.BIND_OUT },
                            }, { autoCommit: true })];
                    case 6:
                        result = _c.sent();
                        txt = result;
                        txt2 = txt.outBinds;
                        _id = txt2.id[0];
                        producto.id_categoria = _id;
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, connection.execute("INSERT INTO categoria VALUES (pk_categoria.nextval,:nombre,:id)", { nombre: cat, id: _id })];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        _b++;
                        return [3 /*break*/, 5];
                    case 10: return [4 /*yield*/, connection.execute("INSERT INTO PRODUCTO values(pk_producto.nextval,:nombre,:imagen,:descripcion,:precio," +
                            ":fecha_publicacion,:cantidad,:color,:estado,:id_categoria,:id_usuario)", producto)];
                    case 11:
                        _c.sent();
                        return [4 /*yield*/, connection.execute("commit")];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 4];
                    case 14:
                        res.status(200).send({ message: "Se guardo carga masiva." });
                        return [3 /*break*/, 21];
                    case 15:
                        err_9 = _c.sent();
                        console.error(err_9);
                        res.status(409).send({ message: "Problema carga masiva." });
                        return [3 /*break*/, 21];
                    case 16:
                        if (!connection) return [3 /*break*/, 20];
                        _c.label = 17;
                    case 17:
                        _c.trys.push([17, 19, , 20]);
                        return [4 /*yield*/, connection.close()];
                    case 18:
                        _c.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        err_10 = _c.sent();
                        console.error(err_10);
                        res.status(409).send({ message: "Error al cerrar la conexión." });
                        return [3 /*break*/, 20];
                    case 20: return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    return ProductosController;
}());
exports.productosController = new ProductosController();
