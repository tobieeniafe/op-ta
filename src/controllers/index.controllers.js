import {
  openAccount,
  getBalance,
  getStatement,
  collect,
} from '../services/index.service';

const IndexController = {
  openAccount(req, res, next) {
    const accountDetails = req.locals;
    openAccount(accountDetails)
      .then((response) => {
        res.status(201).json({
          success: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => next(error));
  },

  getBalance(req, res, next) {
    const accountDetails = req.locals;
    getBalance(accountDetails)
      .then((response) => {
        res.status(200).json({
          success: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => next(error));
  },

  getStatement(req, res, next) {
    const accountDetails = req.locals;
    getStatement(accountDetails)
      .then((response) => {
        res.status(200).json({
          success: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => next(error));
  },

  collect(req, res, next) {
    const accountDetails = req.locals;
    collect(accountDetails)
      .then((response) => {
        res.status(200).json({
          success: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => next(error));
  },
};

export default IndexController;
