import express from 'express';
import IndexController from '../controllers/index.controllers';
import { schemaValidation } from '../helpers/middleware';
import { accountSchema } from '../schemas/index.schema';

const router = express.Router();

router.post(
  '/open-account',
  schemaValidation(accountSchema),
  IndexController.openAccount
);

router.post(
  '/balance',
  schemaValidation(accountSchema),
  IndexController.getBalance
);

router.post(
  '/statement',
  schemaValidation(accountSchema),
  IndexController.getStatement
);

router.post(
  '/collect',
  schemaValidation(accountSchema),
  IndexController.collect
);

module.exports = router;
