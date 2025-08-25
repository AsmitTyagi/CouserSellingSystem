import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/courseService';
import type { Course } from '../models/course';
import { getCurrentUser } from '../services/authService';
import { createPayment } from '../services/razorpayService';
import { confirmPaymentSuccess } from '../services/purchaseService';
import type { Purchase } from '../models/purchase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    getAllCourses().then(setCourses).catch(() => setErrorMessage('Failed to load courses'));
  }, []);

  const purchase = async (course: Course) => {
    const user = getCurrentUser();
    if (!user?.id) {
      setErrorMessage('You should login to buy a course');
      return;
    }
    try {
      const orderRes = await createPayment(course.price);
      const order = orderRes.data;
      const options = {
        key: 'rzp_test_62PkGMZ4214nuj',
        amount: order.amount,
        currency: order.currency,
        name: 'Online Course Seller',
        description: course.title,
        order_id: order.id,
        handler: async (response: any) => {
          const purchaseObj: Purchase = {
            userId: user.id,
            courseId: course.id,
            title: course.title,
            price: course.price,
          };
          await confirmPaymentSuccess(
            purchaseObj,
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );
          setInfoMessage('Purchase successful!');
        },
        theme: { color: '#3399cc' },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setErrorMessage('Payment failed');
    }
  };

  return (
    <div className="container p-3">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {infoMessage && <div className="alert alert-success">{infoMessage}</div>}
      <div className="d-flex flex-wrap">
        {courses.map((item, ind) => (
          <div key={item.id} className="card m-3" style={{ width: 300, backgroundColor: '#f8f7f7' }}>
            <div className="card-body">
              <h5 className="card-title text-uppercase">{item.title}</h5>
              <div className="card-subtitle text-muted">{item.subtitle}</div>
            </div>
            <img src={item.thumbnailUrl} alt={item.title + ' thumbnail'} className="card-img-top" />
            {/* <FontAwesomeIcon icon={faUserGraduate} className="ms-auto me-auto course-icon" /> */}
            <div className="row mt-2 p-3">
              <div className="col-6 mt-2 ps-4">₹{item.price}</div>
              <div className="col-6">
                <button className="btn btn-outline-success w-100" onClick={() => purchase(item)}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
