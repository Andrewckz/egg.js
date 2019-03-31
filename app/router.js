'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.home.index);
  router.get('/user', controller.user.index);
  router.get('/register', controller.user.registerindex);
  router.post('/api/user', controller.user.user);
  router.post('/api/login', controller.user.login);
  router.post('/api/register', controller.user.register);
  router.post('/api/changepwd', controller.user.changepwd);
};
