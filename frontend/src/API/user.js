import axios from 'axios';
import { BASE_URL } from '../utils/constant';

export const Signup = async data => {
  try {
    const response = await axios.post(`http://localhost:5024/api/User`, data);
    console.log(response);
    if (response.status === 201) {
      // Signup successful, handle success logic
      console.log('Signup successful!', response.data);
      return response.data; // You can return any data from the response as needed
    } else {
      // Signup failed, handle error logic
      console.error('Signup failed!');
      return null; // Or you can return an appropriate value for error case
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error occurred while signing up:', error);
    return null; // Or you can return an appropriate value for error case
  }
};

export const Login = async data => {
  try {
    const response = await axios.post(
      `http://localhost:5024/api/User/Login`,
      data
    );

    console.log(response);
    if (response.status === 200) {
      // Signup successful, handle success logic
      console.log('Login successful!', response.data);

      return { status: true, data: response.data };
    } else if (response.status === 401) {
      // Signup failed, handle error logic
      return { status: false, data: response.data }; //
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error occurred while login:', error);
    return { status: false, data: error };
    // Or you can return an appropriate value for error case
  }
};
