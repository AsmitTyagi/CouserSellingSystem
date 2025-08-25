import { api } from './api';
import type { Course } from '../models/course';

const COURSE_URL = '/gateway/course';

export async function getAllCourses() {
  const response = await api.get(COURSE_URL);
  return response.data;
}

export async function saveCourse(course: Course, thumbnail?: File | null) {
  const formData = new FormData();
  formData.append('title', course.title);
  formData.append('subtitle', course.subtitle);
  formData.append('price', course.price.toString());
  if (thumbnail) {
    formData.append('thumbnail', thumbnail);
  }

  const userStr = localStorage.getItem('currentUser');
  const token = userStr ? JSON.parse(userStr).token : undefined;
  const authHeader = `Bearer ${token}`;

  const config = {
    headers: {
      Authorization: authHeader,
    },
  };

  if (course.id) {
    // Update existing course
    return api.put(`${COURSE_URL}/${course.id}`, formData, config);
  } else {
    // Create new course
    return api.post(`${COURSE_URL}/add`, formData, config);
  }
}

export async function deleteCourse(courseId: number) {
  const userStr = localStorage.getItem('currentUser');
  const token = userStr ? JSON.parse(userStr).token : undefined;
  const authHeader = `Bearer ${token}`;
  
  return api.delete(`${COURSE_URL}/${courseId}`, {
    headers: {
      Authorization: authHeader,
    },
  });
}