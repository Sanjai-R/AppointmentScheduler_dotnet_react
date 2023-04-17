import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const getAppointments = async () => {
  try {
    // Make GET request to API endpoint
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    const response = await axios.get(
      `http://localhost:5024/api/Appointment/GetAppointmentByUserId/${userId}`
    );
    if (response.status === 200) {
      console.log('Appointments fetched successfully', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    // Handle error as needed
  }
};
export const createAppointment = async appointmentData => {
  try {
    // Make POST request to API endpoint
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    console.log({
      ...appointmentData,
      userID: userId,
      status: 'Scheduled',
    });
    const response = await axios.post(`http://localhost:5024/api/Appointment`, {
      ...appointmentData,
      userID: userId,
      status: 'Scheduled',
      time: `${appointmentData.time}:00`,
    });

    if (response.status === 201) {
      console.log('Appointment Created successfully', response.data);
      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data }; //
    }
  } catch (error) {
    console.error('Failed to post user data:', error);
    // Handle error as needed
  }
};
export const updateAppointment = async (id, appointmentData) => {
  try {
    // Make POST request to API endpoint
    const userData = localStorage.getItem('userData');
    const userId = JSON.parse(userData).userId;
    console.log({
      ...appointmentData,
      userID: userId,
      time: `${appointmentData.time}`,
    });
    const response = await axios.put(
      `http://localhost:5024/api/Appointment/${id}`,
      {
        ...appointmentData,
        AppointmentID: id,
        userID: userId,
      }
    );
    console.log(response);
    if (response.status === 204) {
      console.log('Appointment Created successfully', response.data);
      return { status: true };
    } else if (response.status === 401) {
      return { status: false }; //
    }
  } catch (error) {
    console.error('Failed to post user data:', error);
    // Handle error as needed
  }
};
export const getAppointmentById = async appointmentId => {
  try {
    // Make GET request to API endpoint
    // const userData = localStorage.getItem('userData');
    // const userId = JSON.parse(userData).userId;
    const response = await axios.get(
      `http://localhost:5024/api/Appointment/${appointmentId}`
    );
    if (response.status === 200) {
      console.log('Appointments fetched successfully', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  }
};

export const deleteAppointment = async appointmentId => {
  try {
    // Make DELETE request to API endpoint
    // const userData = localStorage.getItem('userData');
    // const userId = JSON.parse(userData).userId;
    const response = await axios.delete(
      `http://localhost:5024/api/Appointment/${appointmentId}`
    );
    if (response.status === 204) {
      console.log('Appointment Deleted successfully');
      return { status: true };
    } else if (response.status === 401) {
      return { status: false }; //
    }
  } catch (error) {
    console.error('Failed to delete appointment:', error);
    // Optionally, you can handle error scenarios here and return an error message
  }
};
