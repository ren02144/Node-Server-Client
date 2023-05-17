const axios = require('axios');
const { program } = require('commander');

const baseUrl = 'http://localhost:8000';

program
  .command('get [id]')
  .description('Get object by ID')
  .action((id) => {
    // Make a GET request to the backend API with the provided ID
    axios.get(`${baseUrl}/${id}`)
      .then((response) => {
        console.log('Object:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  });

program
  .command('create <title> <description>')
  .description('Create a new object')
  .action((title, description) => {
    // Make a POST request to the backend API to create a new object
    axios.post(`${baseUrl}/create`, { title, description })
      .then((response) => {
        console.log('Object created:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  });

program
  .command('delete <id>')
  .description('Delete an object by ID')
  .action((id) => {
    // Send a DELETE request to the API server
    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        console.log(`Object with ID ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error('An error occurred while deleting the object:', error.response.data.error);
      });
  });

// Define the update command
program
  .command('update <id> <title> <description>')
  .description('Update an object by ID')
  .action((id, title, description) => {
    const updatedData = { title, description };

    // Send a PATCH request to the API server
    axios.put(`${baseUrl}/update/${id}`, updatedData)
      .then((response) => {
        console.log('Object updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('An error occurred while updating the object:', error.response.data.error);
      });
  });

program.parse(process.argv);
