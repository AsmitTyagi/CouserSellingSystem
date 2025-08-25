import React, { useEffect, useState } from 'react';
import { getAllCourses, saveCourse, deleteCourse } from '../services/courseService';
import type { Course } from '../models/course';
import CourseSave from '../components/CourseSave';
import CourseDelete from '../components/CourseDelete';
import { getCurrentUser } from '../services/authService';

const Admin: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Ensure token is set in Axios on page load
    getCurrentUser();
    getAllCourses().then(setCourses).catch(() => setErrorMessage('Failed to load courses'));
  }, []);

  // Modal logic
  const createCourseRequest = () => {
    setSelectedCourse({ title: '', subtitle: '', price: 0 });
    setShowSaveModal(true);
  };
  const editCourseRequest = (item: Course) => {
    setSelectedCourse({ ...item });
    setShowSaveModal(true);
  };
  const deleteCourseRequest = (item: Course) => {
    setSelectedCourse(item);
    setShowDeleteModal(true);
  };

  const handleSaveCourse = async (course: Course, thumbnail?: File | null) => {
    console.log('Saving course:', course);
    try {
      const res = await saveCourse(course, thumbnail);
      console.log('Save response:', res);
      if (course.id) {
        // Edit: update course in list
        setCourses(prev => prev.map(c => c.id === res.data.id ? res.data : c));
      } else {
        // Create: add new course
        setCourses(prev => [...prev, res.data]);
      }
      setShowSaveModal(false);
      setSelectedCourse(null);
    } catch (err) {
      console.error('Save error:', err);
      setErrorMessage('Unexpected error occurred.');
    }
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;
    console.log('Deleting course:', selectedCourse);
    try {
      const res = await deleteCourse(selectedCourse.id!);
      console.log('Delete response:', res);
      setCourses(courses.filter(c => c.id !== selectedCourse.id));
      setShowDeleteModal(false);
      setSelectedCourse(null);
    } catch (err) {
      console.error('Delete error:', err);
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
              <h3>All Courses</h3>
            </div>
            <div className="col-6 text-end">
              <button className="btn btn-primary" onClick={createCourseRequest}>Create Course</button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item, ind) => (
                <tr key={item.id}>
                  <th>{ind + 1}</th>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>{item.createTime ? new Date(item.createTime).toLocaleString() : ''}</td>
                  <td>
                    <button className="btn btn-primary me-1" onClick={() => editCourseRequest(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteCourseRequest(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showSaveModal && selectedCourse && (
        <CourseSave
          course={selectedCourse}
          onSave={handleSaveCourse}
          onClose={() => {
            setShowSaveModal(false);
            setSelectedCourse(null);
          }}
        />
      )}
      {showDeleteModal && selectedCourse && (
        <CourseDelete
          onConfirm={handleDeleteCourse}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCourse(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;
