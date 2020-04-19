import {Request,Response} from 'express';
import oracledb from 'oracledb';

const conexion= {
  user          : "usuario1",
  password      : "321",
  connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};
class Ruta2Controller{
     conexion= {
      user          : "usuario1",
      password      : "321",
      connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
    };
    public index(req:Request,res:Response){
        
        //res.send('ruta 2');

    }
    async init(req:Request,res:Response) {
        res.send('ruta 2');       
        
    }
    async run(req:Request,res:Response) {

        let connection;
      
        try {
          connection = await oracledb.getConnection(conexion);
      
          const result = await connection.execute("SELECT * FROM disco");
          console.log(result.rows);
          res.send(JSON.stringify(result.rows));
          
      
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
}

export const ruta2Controller=new Ruta2Controller();