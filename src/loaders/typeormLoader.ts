import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createConnection, getConnectionOptions } from 'typeorm';

import { env } from '../env';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    // 获取连接配置
    const loadedConnectionOptions = await getConnectionOptions();
    // 从环境变量中获取配置并覆盖。
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any,
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging,
        entities: env.app.dirs.entities
    });
    // 创建新的数据库连接
    const connection = await createConnection(connectionOptions);
    // 如果启动服务已经有了seeting。那么把数据库连接报错到全局仓库中。
    // 同时设置关闭时端开数据库连接
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
