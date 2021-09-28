import { create } from 'apisauce';

const api = create({
  baseURL: 'https://private-5e2ab-calculatorapp1.apiary-mock.com',
  timeout: 30000
});

export default api;
