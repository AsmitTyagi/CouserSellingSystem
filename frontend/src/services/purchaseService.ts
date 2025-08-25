import { api } from './api';
import type { Purchase } from '../models/purchase';

const PURCHASE_URL = '/gateway/purchase';

export async function savePurchase(purchase: Purchase) {
  return api.post(PURCHASE_URL, purchase);
}

export async function getAllPurchaseItems() {
  return api.get(PURCHASE_URL);
}

export async function confirmPaymentSuccess(purchase: Purchase, paymentId: string, orderId: string, signature: string) {
  const formData = new FormData();
  formData.append('userId', (purchase.userId ?? '').toString());
  formData.append('courseId', (purchase.courseId ?? '').toString());
  formData.append('title', purchase.title ?? '');
  formData.append('price', (purchase.price ?? '').toString());
  formData.append('razorpayPaymentId', paymentId);
  formData.append('razorpayOrderId', orderId);
  formData.append('razorpaySignature', signature);
  return api.post(`${PURCHASE_URL}/payment-success`, formData, {
    headers: {
      'Authorization': api.defaults.headers.common['Authorization'],
    },
  });
}
