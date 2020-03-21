import express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from '../routes/index';
import iDebug from 'debug';
import http from 'http';
const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    const app = express();
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err: any, req: any, res: any, next: any) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
    const debug = iDebug('node-mvc:server');
    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
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
