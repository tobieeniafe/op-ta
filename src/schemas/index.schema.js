import Joi from '@hapi/joi';

export const VALID_GENDERS = {
  male: 'M',
  female: 'F',
};

export const VALID_TITLES = {
  mr: 'Mr',
  mrs: 'Mrs',
  ms: 'Ms',
};

export const accountSchema = Joi.object({
  firstname: Joi.string().label('firstname').allow(null, ''),
  surname: Joi.string().label('surname').allow(null, ''),
  email: Joi.string().label('email').email().allow(null, ''),
  mobile_no: Joi.string().label('mobile_no').allow(null, ''),
  dob: Joi.string().label('dob').allow(null, ''),
  gender: Joi.string()
    .label('gender')
    .valid(...Object.values(VALID_GENDERS).map(String))
    .allow(null, ''),
  title: Joi.string()
    .label('title')
    .valid(...Object.values(VALID_TITLES).map(String))
    .allow(null, ''),
  address: Joi.string().label('address').allow(null, ''),
  city: Joi.string().label('city').allow(null, ''),
  state: Joi.string().label('state').allow(null, ''),
  country: Joi.string().label('country').allow(null, ''),
  start_date: Joi.string().label('start_date').allow(null, ''),
  end_date: Joi.string().label('end_date').allow(null, ''),
  amount: Joi.number().label('amount').allow(null, ''),
  account_number: Joi.string().label('account_number').allow(null, ''),
});
