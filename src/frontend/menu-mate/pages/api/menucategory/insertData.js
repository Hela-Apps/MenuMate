// pages/api/insertData.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, active } = req.body;

    try {
      // Make a POST request to your .NET Core Web API endpoint
      const response = await axios.post('https://localhost:44349/', {
        name,
        active
        
        // Add other required data
      });

      // Assuming the .NET Core API returns a response, you can handle it accordingly
      res.status(200).json({ message: 'Data inserted successfully', responseData: response.data });
    } catch (error) {
      console.error('Error inserting data to .NET Core API:', error);
      res.status(500).json({ message: 'Failed to insert data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
