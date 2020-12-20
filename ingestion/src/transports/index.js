import _ from 'lodash';
import stream from './stream';

const interfaces = {
  stream,
};

const REQUIRED_INTERFACE_FUNCTIONS = {
  transport: true,
};

_.each(interfaces, (module, name) => {
  _.keys(module).forEach((fn) => {
    if (!REQUIRED_INTERFACE_FUNCTIONS[fn]) {
      throw new Error(`Invalid transport module: [${name}]. Missing interface function: [${fn}]`);
    }
  });
});

export default interfaces;
