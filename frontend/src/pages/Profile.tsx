import React, { useEffect, useState } from 'react';
import { getAllPurchaseItems } from '../services/purchaseService';
import { getCurrentUser, logout } from '../services/authService';
import { changeRole } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import type { Purchase } from '../models/purchase';
import { Roles } from '../models/role';

const Profile: React.FC = () => {
  const [purchaseList, setPurchaseList] = useState<Purchase[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    getAllPurchaseItems().then(res => setPurchaseList(res.data)).catch(() => setErrorMessage('Failed to load purchases'));
  }, []);

  const handleChangeRole = async () => {
    const newRole = currentUser?.role === Roles.ADMIN ? Roles.USER : Roles.ADMIN;
    try {
      await changeRole(newRole);
      logout();
      navigate('/login');
    } catch {
      setErrorMessage('Unexpected error occurred.');
    }
  };

  return (
    <div className="container pt-5">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>All Purchased Items</h3>
            </div>
            <div className="col-6 text-end">
              Current role is <strong>{currentUser?.role}</strong>
              {/* <button className="btn btn-primary" onClick={handleChangeRole}>Change Role</button> */}
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchaseList.map((item, ind) => (
                <tr key={item.id}>
                  <th>{ind + 1}</th>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>{item.purchaseTime ? new Date(item.purchaseTime).toLocaleString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
