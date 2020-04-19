import {Request,Response} from 'express';
import oracledb from 'oracledb';


class LoginController{

    async run(req:Request,res:Response) {
      
        let connection;
      
        try {
          connection = await oracledb.getConnection(  {
            user          : "alie",
            password      : "alie",
            connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
          });
      
          const result = await connection.execute("SELECT * FROM usuario");
          console.log(result.rows);
         // res.send(JSON.stringify(result.rows));
         res.json(result.rows);
          //res.send("ho");
      
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
      
      public async create(req: Request, res: Response): Promise<void> {
        let connection;
        try {
          connection = await oracledb.getConnection(  {
            user          : "usuario1",
            password      : "321",
            connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
          });
      
          /*
          await connection.execute('insert into cliente values(:idbv, :cbv)',
          { idbv: 1001, cbv: 'jose ortega' } );
          await connection.execute('commit');*/
         
          
         await connection.execute('insert into cliente values(:id, :nombre)',
         req.body);
         await connection.execute('commit');
           
          res.send("ho");
      
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
              //res.send("cerrar conexion");
            } catch (err) {
              console.error(err);
              res.send("error");
            }
          }
        }
        
    }
}

export const loginController=new LoginController();