import {Router} from 'express';
import {indexController} from '../controllers/indexControllers';
import {ruta2Controller} from '../controllers/ruta2Controllers';
class IndexRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
       this.router.get('/',indexController.index);
       this.router.get('/ruta2',ruta2Controller.run);
    }
}

const indexRoutes = new IndexRoutes(); 

export default indexRoutes.router;
