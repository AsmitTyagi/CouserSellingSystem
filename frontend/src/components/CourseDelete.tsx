import React from 'react';

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const CourseDelete: React.FC<Props> = ({ onConfirm, onClose }) => (
  <div className="modal show d-block" tabIndex={-1}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirmation</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          Are you sure to delete the selected course?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>I'm sure!</button>
        </div>
      </div>
    </div>
  </div>
);

export default CourseDelete;
