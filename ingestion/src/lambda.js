import serverlessExpress from '@vendia/serverless-express';

import app from './app';

const server = serverlessExpress.createServer(app);

exports.handler = (event, context) => serverlessExpress.proxy(server, event, context);
