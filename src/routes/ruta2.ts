import {Router} from 'express';

class Ruta2{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',(req,res)=>res.send('ruta2'));
    }
}

const ruta2 = new Ruta2(); 

export default ruta2.router;