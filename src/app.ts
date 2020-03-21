
import { bootstrapMicroframework } from 'microframework-w3tec';
import expressLoader from './loaders/expressLoader'
bootstrapMicroframework({
    loaders: [
        expressLoader,
    ],
})
    .then(() => {})
    .catch(error => {console.error(error)});
