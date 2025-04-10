import axios from 'axios';

// Example of a GET request
export const getRequest = async (endpoint, headers) => {
  try {
    const response = await axios.get(endpoint); 
    console.log('GET response:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error in GET request:', error.message);
    throw error;
  }
};

// Example of a POST request
export const postRequest = async (endpoint, headers, data) => {
  try {
    const response = await axios.post(endpoint, data);
    console.log('POST response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in POST request:', error.message);
    throw error;
  }
};
