import express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import iDebug from 'debug';
import http from 'http';
import { useExpressServer } from "routing-controllers"; // mvc结构路由的controller包
import { env } from '../env';
import {authorizationChecker} from '../api/auth/authorizationChecker'
import {currentUserChecker} from '../api/auth/currentUserChecker'

const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    console.log('111');
    const app = express();
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    // 配置mvc服务的
    useExpressServer(app, {
        routePrefix: env.app.routePrefix, // 路由前缀
        cors: true, // 是否开启跨域请求
        defaultErrorHandler: false, // 是否使用默认的错误处理机制。后期自己有进行配置。所以就不配置这个了。
        classTransformer: false, // 是否开启类型转换，在获得参数的时候来决定参数形式
        controllers: env.app.dirs.controllers, // 配置controller文件。传入的是一个数组,
        middlewares: env.app.dirs.middlewares, // 配置中间件
        interceptors: env.app.dirs.interceptors, // 配置拦截器
        authorizationChecker: authorizationChecker, // 配置身份校验
        currentUserChecker: currentUserChecker, // 获取当前用户
    });
    // app.use('/', indexRouter);

    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //     res.json('error');
    //     next(createError(404));
    // });

    // // error handler
    // app.use(function (err: any, req: any, res: any, next: any) {
    //     // set locals, only providing error in development
    //     res.locals.message = err.message;
    //     res.locals.error = req.app.get('env') === 'development' ? err : {};

    //     // render the error page
    //     res.status(err.status || 500);
    //     res.json('error');
    // });
    const debug = iDebug('node-mvc:server');
    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port);
    // server.on('error', onError);
    server.on('listening', onListening);


    function normalizePort(val: any) {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }

    function onError(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port : `'Port '${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr: any = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : `port '${addr.port}`;
        console.log(`server start in ${bind}`)
        debug('Listening on ' + bind);
    }

};

export default expressLoader;
