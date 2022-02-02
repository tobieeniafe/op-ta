import dotenv from 'dotenv';
import axios from 'axios';
import md5 from 'md5';
import crypto from 'crypto';
import { ErrorHandler } from '../helpers/errorHandler';

dotenv.config();

const ENDPOINT = `https://api.onepipe.io/v2/transact`;
const TOKEN = process.env.ONE_PIPE_KEY;
const SECRET = process.env.ONE_PIPE_SECRET;

const GEN_REF = () => Math.random().toString(36).slice(2);

const encrypt = (data) => {
  const secretKey = SECRET;
  const bufferedKey = Buffer.from(secretKey, 'utf16le');

  const key = crypto.createHash('md5').update(bufferedKey).digest();
  const newKey = Buffer.concat([key, key.slice(0, 8)]);
  const IV = Buffer.alloc(8, '\0');

  const cipher = crypto
    .createCipheriv('des-ede3-cbc', newKey, IV)
    .setAutoPadding(true);
  return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
};

const encryptMd5 = (data) => {
  const secret = SECRET;
  return md5(`${data};${secret}`);
};

const request_ref = GEN_REF();

const provider = {
  name: 'DemoProvider',
  code: '0001',
};

const SIGNATURE = encryptMd5(request_ref);

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
  Signature: SIGNATURE,
};

export const openAccount = async (accountDetails) => {
  const data = {
    request_ref,
    request_type: 'open_account',
    auth: {
      type: null,
      auth_provider: provider.name,
    },
    transaction: {
      mock_mode: 'inspect',
      transaction_ref: GEN_REF(),
      transaction: {
        desc: `Open Account for ${accountDetails.firstname} ${accountDetails.surname}`,
      },
      amount: 0,
      customer: {
        customer_ref: GEN_REF(),
        firstname: accountDetails.firstname,
        surname: accountDetails.surname,
        email: accountDetails.email,
        mobile_no: accountDetails.mobile_no,
      },
      details: {
        name_on_account: `${accountDetails.firstname} ${accountDetails.surname}`,
        dob: accountDetails.dob,
        gender: accountDetails.gender,
        title: accountDetails.title,
        address_line_1: accountDetails.address,
        city: accountDetails.city,
        state: accountDetails.state,
        country: accountDetails.country,
      },
    },
  };

  try {
    const response = await axios.post(ENDPOINT, data, { headers: HEADERS });
    return response.data;
  } catch (error) {
    throw new ErrorHandler(error.status, error.message, error.data);
  }
};

export const getBalance = async (accountDetails) => {
  let data = {
    request_ref,
    request_type: 'get_balance',
    auth: {
      auth_provider: provider.name,
      route_mode: null,
    },
    amount: 0,
    transaction: {
      mock_mode: 'inspect',
      transaction_ref: GEN_REF(),
      transaction_ref_parent: null,
      transaction: {
        desc: 'Get balance',
      },
      customer: {
        customer_ref: GEN_REF(),
        firstname: accountDetails.firstname,
        surname: accountDetails.surname,
        email: accountDetails.email,
        mobile_no: accountDetails.mobile_no,
      },
      details: {},
    },
  };
  try {
    const response = await axios.post(ENDPOINT, data, { headers: HEADERS });
    return response.data;
  } catch (error) {
    throw new ErrorHandler(error.status, error.message, error.data);
  }
};

export const getStatement = async (accountDetails) => {
  let data = {
    request_ref,
    request_type: 'get_statement',
    auth: {
      auth_provider: provider.name,
      route_mode: null,
    },
    amount: 0,
    transaction: {
      mock_mode: 'inspect',
      transaction_ref: GEN_REF(),
      transaction_desc: 'Get statement',
      transaction_ref_parent: null,
      customer: {
        customer_ref: GEN_REF(),
        firstname: accountDetails.firstname,
        surname: accountDetails.surname,
        email: accountDetails.email,
        mobile_no: accountDetails.mobile_no,
      },
      details: {
        start_date: accountDetails.start_date,
        end_date: accountDetails.end_date,
      },
    },
  };
  try {
    const response = await axios.post(ENDPOINT, data, { headers: HEADERS });
    return response.data;
  } catch (error) {
    throw new ErrorHandler(error.status, error.message, error.data);
  }
};

export const collect = async (accountDetails) => {
  let data = {
    request_ref,
    request_type: 'transfer_funds',
    auth: {
      type: 'bank.account',
      secure: encrypt(`${accountDetails.account_number};${provider.code}`),
      auth_provider: provider.name,
      route_mode: null,
    },
    transaction: {
      mock_mode: 'inspect',
      transaction_ref: GEN_REF(),
      transaction_desc: `Collect ${accountDetails.amount}`,
      transaction_ref_parent: null,
      amount: accountDetails.amount * 100, // convert to kobo
      customer: {
        customer_ref: GEN_REF(),
        firstname: accountDetails.surname,
        surname: accountDetails.surname,
        email: accountDetails.email,
        mobile_no: accountDetails.mobile_no,
      },
      details: null,
    },
  };

  try {
    const response = await axios.post(ENDPOINT, data, { headers: HEADERS });
    return response.data;
  } catch (error) {
    throw new ErrorHandler(error.status, error.message, error.data);
  }
};
