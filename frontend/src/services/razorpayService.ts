import { api } from './api';

const RAZORPAY_URL = '/gateway/purchase';

export async function createPayment(amount: number) {
  return api.post(`${RAZORPAY_URL}/create-payment?amount=${amount}`, {});
}
