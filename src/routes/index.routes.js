import express from 'express';
import IndexController from '../controllers/index.controllers';
import { schemaValidation } from '../helpers/middleware';
import { openAccountSchema } from '../schemas/index.schema';

const router = express.Router();

router.post(
  '/open',
  schemaValidation(openAccountSchema),
  IndexController.openAccount
);

router.get('/balance', IndexController.getBalance);

router.get('/statement', IndexController.getStatement);

module.exports = router;
