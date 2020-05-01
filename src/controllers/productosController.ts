import {Request,Response, text} from 'express';
import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';

const conexion= {
    user          : "alie",
    password      : "alie",
    connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
  };
let producto= {
    nombre: '',
    imagen: '',
    descripcion:'',
    precio:1,
    fecha_publicacion:'',
    cantidad:1,
    color:'',
    estado:1,
    id_categoria:0,
    id_usuario:0
  }
  class ProductosController {
    public async create(req: Request, res: Response) {
      let connection;
      let txtCategoria: string = req.body.categoria;
      let categorias: Array<string> = txtCategoria.split("-");
      try {
        const txt_id: any = await jwt.verify(req.body.id_usuario, "alie-sell");
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
        connection = await oracledb.getConnection(conexion);
        let primero: boolean = true;
        let _id: number = 0;
        if (categorias[0] !== "")
          for (let cat of categorias) {
            if (primero) {
              primero = false;
              const result = await connection.execute(
                `INSERT INTO categoria VALUES (pk_categoria.nextval,:nombre,null) RETURN id_categoria INTO :id`,
                {
                  nombre: cat,
                  id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
                },
                { autoCommit: true }
              );
              const txt: any = result;
              const txt2: any = txt.outBinds;
              _id = txt2.id[0];
              producto.id_categoria = _id;
            } else {
              await connection.execute(
                `INSERT INTO categoria VALUES (pk_categoria.nextval,:categoria,:id)`,
                { categoria: cat, id: _id }
              );
            }
          }
        await connection.execute(
          "INSERT INTO PRODUCTO values(pk_producto.nextval,:nombre,:imagen,:descripcion,:precio," +
            ":fecha_publicacion,:cantidad,:color,:estado,:id_categoria,:id_usuario)",
          producto
        );
        await connection.execute("commit");

        res.status(200).send({ message: "Producto guardado" });
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: "Problema al crear producto." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: "Error al cerrar la conexión." });
          }
        }
      }
    }

    public async eliminar(req: Request, res: Response) {
      let connection;
      try {
        connection = await oracledb.getConnection(conexion);

        console.log(req.body);

        await connection.execute(
          "update producto set estado=0 where codigo=:cod",
          req.body
        );
        await connection.execute("commit");

        res.status(200).send({ message: "Producto eliminado" });
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: "Problema al eliminar producto." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: "Error al cerrar la conexión." });
          }
        }
      }
    }

    public async listar(req: Request, res: Response) {
      let connection;
      try {
        const { id }: any = req.params;
        const { _id }: any = await jwt.verify(id, "alie-sell");
        connection = await oracledb.getConnection(conexion);
        const result = await connection.execute(
          "SELECT * FROM producto WHERE estado=1 AND id_usuario=:id",
          { id: _id }
        );
        res.status(200).send(result.rows);
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: "Problema al listar productos." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: "Error al cerrar la conexión." });
          }
        }
      }
    }

    public async buscar(req: Request, res: Response) {
      let connection;
      try {
        const { nombre }: any = req.params;
        connection = await oracledb.getConnection(conexion);
        const result = await connection.execute(
          `SELECT * FROM producto WHERE estado=1 AND nombre like '%${nombre}%'`
        );
        res.status(200).send(result.rows);
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: "Problema al buscar productos." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: "Error al cerrar la conexión." });
          }
        }
      }
    }

    public cargarImagen(req: Request, res: Response) {
      return res.status(200).json({
        message: "Imagen guardada.",
        imagePath: req.file.path,
      });
    }

    async cargaMasiva(req: Request, res: Response) {
      let connection;
      const { texto, id_usuario } = req.body;
      const tuplas: Array<string> = texto.split("\n");
      const txt_id: any = await jwt.verify(id_usuario, "alie-sell");
      //console.log("idusuario: ", txt_id);
      try {
        connection = await oracledb.getConnection(conexion);
        for (let tupla of tuplas) {
          const campos = tupla.split(",");
         // console.log(campos);
          producto.nombre = campos[0];
          producto.imagen = campos[1];
          producto.descripcion = campos[2];
          producto.precio = Number.parseFloat(campos[3]);
          const fechaArreglada = function (fecha: string): string {
            let separador = fecha.split(" ");
            let year = separador[3];
            let mes = separador[1];
            let dia = separador[2];
            let numMes: number;
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
            let fechaArreglada = dia + "-" + numMes + "-" + year;
            return fechaArreglada;
          };
          producto.fecha_publicacion = fechaArreglada(
            new Date().toDateString()
          );
          producto.cantidad = Number.parseInt(campos[4]);
          producto.color = campos[5];
          producto.estado = 1;
          producto.id_usuario = txt_id._id;
          //console.log(producto, "fecha: ", producto.fecha_publicacion);
          //**************************************** */

          let txtCategoria: string = campos[6];
          let categorias: Array<string> = txtCategoria.split("-");

          let primero: boolean = true;
          let _id: number = 0;
          if (categorias[0] !== "") {
            for (let cat of categorias) {
              if (primero) {
                primero = false;
                const result = await connection.execute(
                  `INSERT INTO categoria VALUES (pk_categoria.nextval,:nombre,null) RETURN id_categoria INTO :id`,
                  {
                    nombre: cat,
                    id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
                  },
                  { autoCommit: true }
                );
                const txt: any = result;
                const txt2: any = txt.outBinds;
                _id = txt2.id[0];
                producto.id_categoria = _id;
              } else {
                await connection.execute(
                  `INSERT INTO categoria VALUES (pk_categoria.nextval,:nombre,:id)`,
                  { nombre: cat, id: _id }
                );
              }
            }
          }

          await connection.execute(
            "INSERT INTO PRODUCTO values(pk_producto.nextval,:nombre,:imagen,:descripcion,:precio," +
              ":fecha_publicacion,:cantidad,:color,:estado,:id_categoria,:id_usuario)",
            producto
          );
          await connection.execute("commit");
        }
        res.status(200).send({ message: "Se guardo carga masiva." });
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: "Problema carga masiva." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: "Error al cerrar la conexión." });
          }
        }
      }
    }
  }

export const productosController=new ProductosController();