import basicAuth from 'express-basic-auth';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as express from 'express';


import { env } from '../env';

export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.swagger.enabled) {
        const expressApp = settings.getData('express_app');
        // 获取swagger配置 文件
        const swaggerFile = require(path.join(__dirname, '..', env.swagger.file));

        // 获取swagger基本信息
        swaggerFile.info = {
            title: env.app.name,
            description: env.app.description,
            version: env.app.version,
        };
        // 配置swagger服务请求路径
        swaggerFile.servers = [
            {
                url: `${env.app.schema}://${env.app.host}:${env.app.port}${env.app.routePrefix}`,
            },
        ];
        // 创建swagger服务。
        expressApp.use(
            env.swagger.route, // 配置swagger路由
            env.swagger.username ? basicAuth({
                users: {
                    [`${env.swagger.username}`]: env.swagger.password,
                },
                challenge: true,
            }) : (req:express.Request, res:express.Response, next:express.NextFunction) => next(),
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );

    }
};
