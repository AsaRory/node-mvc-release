import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';

/**
 *  这里要加入依赖注入。把项目需要的实例注入到container中。在后面我们才能直接使用注解获取。
 * 而 routing-controllers 和 typeorm 都为我们提供了依赖注入的封装方法，
 * 在此我们直接使用即可
 */
export const iocLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    routingUseContainer(Container);
    ormUseContainer(Container);
};
