import * as express from 'express';
import 'reflect-metadata';
import Container from 'typedi';
import { useExpressServer,useContainer } from 'routing-controllers';
import { UserController } from './UserController';
import { HomeController } from './HomeController';
import { ErrorMiddleware } from '../Middleware/ErrorMiddleware';

const httpContext = require('express-http-context');
useContainer(Container);
let router = express.Router();
router.use(httpContext.middleware);

useExpressServer(router, {
    classTransformer: true,
    defaultErrorHandler: false,
    controllers: [ HomeController, UserController ],
    middlewares: [ ErrorMiddleware ]
})

export default router;