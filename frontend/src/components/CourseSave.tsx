import React, { useState } from 'react';
import type { Course } from '../models/course';
import { saveCourse } from '../services/courseService';

interface Props {
  course: Course;
  onSave: (course: Course, thumbnail?: File | null) => void;
  onClose: () => void;
}

const CourseSave: React.FC<Props> = ({ course, onSave, onClose }) => {
  const [title, setTitle] = useState(course.title);
  const [subtitle, setSubtitle] = useState(course.subtitle);
  const [price, setPrice] = useState(course.price);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Require thumbnail for create, optional for edit
    if (!course.id && !thumbnail) {
      setErrorMessage('Thumbnail file is required.');
      return;
    }
    try {
      const newCourse: Course = { ...course, title, subtitle, price };
      onSave(newCourse, thumbnail);
      onClose();
    } catch {
      setErrorMessage('Unexpected error occurred.');
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Course Details</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="subtitle">Subtitle</label>
                <input type="text" className="form-control" id="subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" className="form-control" id="price" value={price} onChange={e => setPrice(Number(e.target.value))} required />
              </div>
              <div className="form-group">
                <label htmlFor="thumbnail">Thumbnail</label>
                <input type="file" className="form-control" id="thumbnail" onChange={e => setThumbnail(e.target.files?.[0] || null)} />
                {course.id && <small className="text-muted">Leave blank to keep existing thumbnail.</small>}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseSave;
