import * as dotenv from 'dotenv';
import * as path from 'path';
const join = path.join;
/**
 * 这里要注意需要再tsconfig.json里配置"resolveJsonModule": true, 
 * 才能引入json
 */
import * as pkg from '../package.json';


// 这行代码可以选择你拥有的后缀。选择不同的环境。
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'development') ? '.development' : '')}`) });

export const env = {
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        tokenSecret:getOsEnv('TOKEN_SECRET'),
        dirs: {
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
            interceptors: getOsPaths('INTERCEPTORS'),
            // migrations: getOsPaths('TYPEORM_MIGRATIONS'), // 暂时不需要做migrations
            // migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
            entities: getOsPaths('TYPEORM_ENTITIES'),
            entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
        }
    },
    db: {
        type: getOsEnv('TYPEORM_CONNECTION'),
        host: getOsEnvOptional('TYPEORM_HOST'),
        port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
        username: getOsEnvOptional('TYPEORM_USERNAME'),
        password: getOsEnvOptional('TYPEORM_PASSWORD'),
        database: getOsEnv('TYPEORM_DATABASE'),
        synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
        logging: getOsEnv('TYPEORM_LOGGING'),
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        file: getOsEnv('SWAGGER_FILE'),
        username: getOsEnv('SWAGGER_USERNAME'),
        password: getOsEnv('SWAGGER_PASSWORD'),
    },
}
export function toBool(value: string | undefined): boolean {
    return value === 'true';
}
export function toNumber(value: string | undefined): number {
    return parseInt(value || '', 10);
}
export function getOsEnvOptional(key: string): string | undefined {
    return process.env[key];
}

export function getOsEnv(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

export function getOsPaths(key: string): string[] {
    return getPaths(getOsEnvArray(key));
}

export function getOsEnvArray(key: string, delimiter: string = ','): string[] {
    /// @ts-ignore
    return process.env[key] && process.env[key].split(delimiter) || [];
}

export function getPath(path: string): string {
    // 不同的环境下获取的文件夹不同。如果是开发环境。那么跟文件夹就是dist。要做替换
    return (process.env.NODE_ENV === 'production')
        ? join(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : join(process.cwd(), path);
}
export function getPaths(paths: string[]): string[] {
    return paths.map(p => getPath(p));
}
export function getOsPath(key: string): string {
    return getPath(getOsEnv(key));
}
export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}