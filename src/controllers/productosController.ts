import {Request,Response} from 'express';
import oracledb from 'oracledb';


const conexion= {
    user          : "alie",
    password      : "alie",
    connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
  };

  class ProductosController {
      
    public async create(req: Request, res: Response) {
      let connection;
      try {
        connection = await oracledb.getConnection(conexion);
        await connection.execute(
          "INSERT INTO PRODUCTO values(pk_producto.nextval,:nombre,:imagen,:descripcion,:precio," +
            ":fecha_publicacion,:cantidad,:color,:estado,:id_categoria,:id_usuario)",
          req.body
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
        connection = await oracledb.getConnection(conexion);
        const result = await connection.execute("SELECT * FROM producto WHERE id_usuario=:id",req.body);
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

  }

export const productosController=new ProductosController();