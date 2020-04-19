import { Router } from 'express';

import { loginController} from '../controllers/loginController';

class LoginRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', loginController.run);
       // this.router.get('/:id', gamesController.getOne);
        this.router.post('/', loginController.create);
        //this.router.put('/:id', gamesController.update);
       // this.router.delete('/:id', gamesController.delete);
    }

}

export default new LoginRoutes().router;