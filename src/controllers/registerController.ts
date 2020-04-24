import {Request,Response, response} from 'express';
import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';


const conexion= {
  user          : "alie",
  password      : "alie",
  connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};
class RegisterController{
    SECRET_KEY:string ='alie-sell';

     
    public async create(req: Request, res: Response) {
      let connection;
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.clave, salt);
      req.body.clave=hash;
      
      try {
        connection = await oracledb.getConnection(conexion);
    
        /*
        await connection.execute('insert into cliente values(:idbv, :cbv)',
        { idbv: 1001, cbv: 'jose ortega' } );
        await connection.execute('commit');*/
        console.log(req.body);
        
        await connection.execute('insert into usuario(id_usuario,nombre,apellidos,clave,correo,telefono,fecha_nac,genero,direccion) '
                              + 'values(pk_usuario.nextval, :nombre,:apellidos,:clave,:correo,:telefono,:fecha_nac,'
                              + ':genero,:direccion)',req.body);
        await connection.execute('commit');

        const result = await connection.execute(
          `BEGIN
              SELECT id_usuario INTO :id_u FROM usuario WHERE correo = :correo;
            END;`,
          {  // bind variables
            correo:   req.body.correo,
            id_u: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 40 },
          }
        );
        const txt:any=result;
        const txt2:any=txt.outBinds;
        const _id:any=txt2.id_u;
        const expiresIn:number=24*60*60;
        //const accessToken = jwt.sign({nombre:req.body.id_usuario},'alie-sell',{expiresIn:expiresIn});
        /* const dataU={
          correo:req.body.correo,
          accessToken:accessToken,
          expireIns:expiresIn
        } */
        const accessToken = jwt.sign({_id:_id},'alie-sell');
        const dataU={
          correo:req.body.correo,
          accessToken:accessToken
        }

        //**********************CORREO ``
        const link=`http://localhost:3000/register/confirmar/${accessToken}`;
        const TXTUSER=process.env.MAILUSER;
        const TXTCLAVE=process.env.MAILPASSWD;
        
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: TXTUSER,
              pass: TXTCLAVE
          }
        });
        let mail_options = {
          from: TXTUSER,
          to: dataU.correo,
          subject: `Bienvenido `,
          html: `
              <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#96F726" bgcolor="#cddf89">
              <tr height="150px">  
                  <td width="750px">
                      <h1 style="color: #0000FF; text-align:center">Bienvenido a Alie Sell</h1>
                      <p  style="color: #0000FF; text-align:center">
                          <span style="color: #FF0000">${req.body.nombre}</span>                           
                      </p>
                  </td>
              </tr>
              <tr bgcolor="#EB5E27">
                  <td style="text-align:center">
                      <p style="color: #FDFCFC">Para confirmar su cuenta selecciones el siguiente enlace: ${link}</p>
                  </td>
              </tr>
              </table>          
          `
          };
          transporter.sendMail(mail_options, (error, info) => {
            if (error) {
                console.log(error);
                res.status(409).send({ message: 'Error al mandar el correo.' });
            } else {
                console.log('El correo se envío correctamente ' + info.response);
            }
          });



        //*********************************TERMINA CORREO */
          

      res.status(200).send({dataU});

        // res.send(accesToken);
    
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: 'Problema al registrarse.' });
      } finally {
        if (connection) {
          try {
            await connection.close();
            //res.send("cerrar conexion");
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: 'Error al cerrar la conexión.' });
          }
        }
      }
        
    }

    public async loginUser(req:Request,res:Response){
        //res.send('login');
        let connection;
        const userData = {
            correo: req.body.correo,
            clave: req.body.clave
          }
      
        try {
          connection = await oracledb.getConnection(conexion);
      
          const result = await connection.execute(
            `BEGIN
               SELECT clave INTO :clave FROM usuario WHERE correo = :correo;
               SELECT id_usuario INTO :id_u FROM usuario WHERE correo = :correo;
               SELECT confirmacion INTO :conf FROM usuario WHERE correo = :correo;
             END;`,
            {  // bind variables
              correo:   userData.correo,
              clave: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
              id_u: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 20 },
              conf: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 1 }
            }
          );
                
                
                const txt:any=result;
                const txt2:any=txt.outBinds;
                const txt3:string=txt2.clave;
                const _id:any=txt2.id_u;
                //const fila:any=JSON.stringify(result.outBinds);
                if(txt2.conf==0){
                  res.status(409).send({ message: 'Correo no autenticado.' });
                  return;
                }
                
                const resultPassword = bcrypt.compareSync(userData.clave,txt3);

                if (resultPassword) {
                  const accessToken = jwt.sign({_id:_id},'alie-sell');
          
                  const dataU={
                    name:req.body.name,
                    correo:req.body.correo,
                    accessToken:accessToken
                 }
                  res.status(200).send({ dataU });
                } else {
                  // password wrong
                  res.status(409).send({ message: 'Contraseña invalida.' });
                }
                 //res.send(resultPassword);



                //res.send(userData.clave);
                
          
                
               //console.log(txt);
                //console.log(userData.clave);
          

      
        } catch (err) {
            if(err.errorNum=== 1403)
                res.status(409).send({ message: 'Correo no existe.' });
            else
                res.status(409).send({ message: 'Problema al logearse.' });  
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
              res.status(409).send({ message: 'Problema al cerra la conexión.' });
            }
          }
        }
      }

    public async confirmarCorreo(req:Request,res:Response):Promise<void> {
      let connection;
      const { id }=req.params;
     try {
      const txt_id:any= await jwt.verify(id,'alie-sell');
      //console.log(id);
      //console.log(txt_id._id);
      //res.status(200).send(req.params);
      
        connection = await oracledb.getConnection(conexion);
    
        const result = await connection.execute(
          `update usuario set confirmacion = :val1 where id_usuario=:valId`,
          {  // bind variables
            val1:  1,
            valId: txt_id._id
          }
        );
        if(result.rowsAffected==0){
          res.status(409).send({ message: 'Problema al confirmar correo, no encontro al usuario.' });
        }else{
          console.log(result);
          await connection.execute('commit');
                
            res.status(200).redirect('http://localhost:4200/login');
        }
        
        

    
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: 'Problema al confirmar correo.' });
      } finally {
        if (connection) {
          try {
            await connection.close();            
            //res.send("cerrar conexion");
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: 'Error al cerrar la conexión.' });
          }
        }
      }
    }
    
    async run(req:Request,res:Response) {
        
      let connection;
      
      try {
        connection = await oracledb.getConnection(conexion);
    
        const result = await connection.execute("SELECT * FROM usuario");
       // console.log(result.rows);
       // res.send(JSON.stringify(result.rows));
       res.json(result.rows);
        //res.send("ho");
    
      } catch (err) {
        console.error(err);
        res.status(409).send({ message: 'Problema al listar.' });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
            res.status(409).send({ message: 'Error al cerrar la conexión.' });
          }
        }
      }
    }
    
   
}

export const registerController=new RegisterController();