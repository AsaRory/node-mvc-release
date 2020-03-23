
import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';
import expressLoader from './loaders/expressLoader'
import { iocLoader } from './loaders/iocLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { swaggerLoader } from './loaders/swaggerLoader';
bootstrapMicroframework({
    loaders: [
        iocLoader,
        typeormLoader,
        expressLoader,
        swaggerLoader
    ],
})
    .then(() => {})
    .catch(error => {console.error(error)});
