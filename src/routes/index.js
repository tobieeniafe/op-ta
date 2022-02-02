import index from './index.routes';

export default (app) => {
  app.use('/api', index);
};
