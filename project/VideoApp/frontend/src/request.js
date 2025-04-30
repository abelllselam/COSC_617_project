import axios from 'axios';

const baseURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080' 
  : window.location.origin;

// Example of a GET request
export const getRequest = async (endpointURL) => {
  try {
    const endpoint = `${baseURL}${endpointURL}`;
    const response = await axios.get(endpoint); 
    console.log('GET response:', response.data);
    return response; 
  } catch (error) {
    console.error('Error in GET request:', error.message);
    throw error;
  }
};

// Example of a POST request
export const postRequest = async (endpointURL, headers, data) => {
  try {
    const endpoint = `${baseURL}${endpointURL}`;
    const response = await axios.post(endpoint, data, headers);
    console.log('POST response:', response.data);
    return response;
  } catch (error) {
    console.error('Error in POST request:', error.message);
    throw error;
  }
};
