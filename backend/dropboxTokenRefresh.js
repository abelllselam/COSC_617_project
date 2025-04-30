import axios from 'axios';
import qs from 'qs'; // For URL-encoding the request body
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export async function getDropboxToken() {
  try {
    const response = await axios.post('https://api.dropboxapi.com/oauth2/token', 
      qs.stringify({
        refresh_token: `${process.env.DropBox_Refresh_Token}`,
        grant_type: 'refresh_token',
        client_id: `${process.env.DropBox_App_Key}`,
        client_secret: `${process.env.DropBox_App_Secret}`,
      }), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );

    return response.data.access_token
  } catch (error) {
    console.error('Error fetching token:', error.response?.data || error.message);
  }
}

