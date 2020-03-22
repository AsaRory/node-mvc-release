import * as dotenv from 'dotenv';
import * as path from 'path';
const join = path.join;

// 这行代码可以选择你拥有的后缀。选择不同的环境。
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'development') ? '.development' : '')}`) });

export const env={
    app:{
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        dirs:{
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
            interceptors: getOsPaths('INTERCEPTORS'),
            // migrations: getOsPaths('TYPEORM_MIGRATIONS'),
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
}
export function toBool(value: string|undefined): boolean {
    return value === 'true';
}
export function toNumber(value: string|undefined): number {
    return parseInt(value||'', 10);
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