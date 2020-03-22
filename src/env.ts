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
        }
    }
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