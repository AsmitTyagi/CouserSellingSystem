import React from 'react';

const Unauthorized: React.FC = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <span className="display-1">401</span>
        <div className="mb-4 lead">Unauthorized! Access to this resource is denied.</div>
        <a href="/home" className="btn btn-link">Back to Home</a>
      </div>
    </div>
  </div>
);

export default Unauthorized;
