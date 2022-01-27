import {
  openAccount,
  getBalance,
  getStatement,
} from '../services/index.service';

const IndexController = {
  openAccount(req, res, next) {
    // const accountDetails = req.locals;
    openAccount()
      .then(() => {
        res.status(201).json({ success: true, message: 'Account opened' });
      })
      .catch((error) => next(error));
  },
  getBalance(req, res, next) {
    // const { refNo } = req.params;
    getBalance()
      .then(() => {
        res.status(200).json({ success: true, message: 'Balance retrieved' });
      })
      .catch((error) => next(error));
  },
  getStatement(req, res, next) {
    getStatement()
      .then(() => {
        res.status(200).json({ success: true, message: 'Statement retrieved' });
      })
      .catch((error) => next(error));
  },
};

export default IndexController;
