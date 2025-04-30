import axios from 'axios';
import { getDropboxToken } from './dropboxTokenRefresh.js'


const dropboxUploadUrl = 'https://content.dropboxapi.com/2/files/upload';
const dropboxLinkUrl = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';

export const dropboxUploadVideo = async (fileName, fileBuffer) => {
    const accessToken = await getDropboxToken();
    // Generate a random videoId string
    const videoId = Math.random().toString(36).substring(2, 15);
    const filePath = `/TU_Video_App/Videos/${videoId}${fileName}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
            path: filePath,
            mode: 'add',
            autorename: false,
            mute: true,
        }),
    };

    try {
        // Upload the file to Dropbox
        const uploadResponse = await axios.post(dropboxUploadUrl, fileBuffer, { headers });
        console.log('File uploaded successfully:', uploadResponse.data);

        // Now that the file is uploaded, get the temporary shareable link
        const sharedLinkResponse = await axios.post(dropboxLinkUrl, {
            path: filePath,
            settings: {
                requested_visibility: 'public', // Optionally set visibility
                audience: 'public', // Set to 'public' for publicly accessible, or 'team' for restricted to your team
                access: 'viewer', // You can also set 'editor' if needed
            }
        },{
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Get the shared Dropbox link
        const sharedLink = sharedLinkResponse.data.url;

        const streamingLink = sharedLink
        .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        .replace('?dl=0', '') // remove download param
        .replace('?dl=1', ''); // handle alt case

        // Return the streaming link in the response
        return {
            status: 200,
            message: 'File uploaded and link generated successfully!',
            videoId: videoId,
            streamingLink: streamingLink, // Use streaming link here
        };
    } catch (error) {
        console.error('Error in Dropbox Connect:', error);
        return {
            status: 500,
            error: 'Error uploading file or generating link from Dropbox',
        };
    }
};
export const dropboxUploadImage = async (fileName, fileBuffer) => {
    const imageId = Math.random().toString(36).substring(2, 15);
    const accessToken = await getDropboxToken(); // moved inside

    const filePath = `/TU_Video_App/Images/${imageId}${fileName}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
            path: filePath,
            mode: 'add',
            autorename: false,
            mute: true,
        }),
    };

    try {
        const uploadResponse = await axios.post(dropboxUploadUrl, fileBuffer, { headers });
        console.log('Image uploaded:', uploadResponse.data);

        const sharedLinkResponse = await axios.post(dropboxLinkUrl, {
            path: filePath,
            settings: {
                requested_visibility: 'public',
                audience: 'public',
                access: 'viewer',
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const sharedLink = sharedLinkResponse.data.url;
        const imageLink = sharedLink
            .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
            .replace('?dl=0', '')
            .replace('?dl=1', '');

        return {
            status: 200,
            imageLink,
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            status: 500,
        };
    }
};
