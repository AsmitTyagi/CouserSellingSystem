import React from 'react';

const NotFound: React.FC = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <span className="display-1">404</span>
        <div className="mb-4 lead">Oops! We can't seem to find the page you are looking for.</div>
        <a href="/home" className="btn btn-link">Back to Home</a>
      </div>
    </div>
  </div>
);

export default NotFound;
