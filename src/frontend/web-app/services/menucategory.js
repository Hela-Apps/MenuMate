import axios from 'axios';

class ApiHandler {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:44349/api/menucategory',
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers
      },
    });
  }

  async createData(data) {
    try {
      const response = await this.api.post('add',data);
      return response.data;
    } catch (error) {
      throw new Error('Error creating data:', error);
    }
  }

  async updateData(updatedData) {
    try {
      const response = await this.api.put(`update`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error('Error updating data:', error);
    }
  }

  async deleteData(id) {
    try {
      const response = await this.api.delete(`endpoint/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error deleting data:', error);
    }
  }

  async getAll(){
    try {
      const response = await this.api.get(`getall`);
      return response.data;
      
    } catch (error) {
      throw new Error('Error GetAll data:', error);
    }
  }

  async getLastId(){
    try {
      const response = await this.api.get(`GetLastId`);
      return response.data;
      
    } catch (error) {
      throw new Error('Error GetAll data:', error);
    }
  }
}

export default ApiHandler;
