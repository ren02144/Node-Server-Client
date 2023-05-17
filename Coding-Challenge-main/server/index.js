import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
export const app = express();

app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({
          error: "Could not decode request: JSON parsing failed",
        });
        throw Error("invalid JSON");
      }
    },
  })
);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const rawData = fs.readFileSync('data.json');
  const data = JSON.parse(rawData);
  const object = data.find((obj) => obj.id == id);

  res.send(`GET object successfully ${JSON.stringify(object)}`)
})

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const rawData = fs.readFileSync('data.json');
  const data = JSON.parse(rawData);
  // Find the index of the object with the matching ID
  const index = data.findIndex((obj) => obj.id == id);

  // If the index is found (object with the matching ID exists)
  if (index !== -1) {
    // Remove the object from the data array
    data.splice(index, 1);

    // Convert the data back to JSON
    const updatedJsonData = JSON.stringify(data, null, 2);

    // Write the updated data back to the file
    fs.writeFileSync('data.json', updatedJsonData, 'utf8');

    console.log(`Object with ID ${id} deleted successfully.`);
  } else {
    console.log(`Object with ID ${id} not found.`);
  }

  res.send(`Object with ID ${id} deleted successfully.`)
})

app.post("/create", async (req, res) => {
  const { title, description } = req.body;

  // Create a new object using the provided data
  const newObject = {
    id: uuidv4(),
    title,
    description,
  };

  // Add the new object to your data source or storage
  const existingData = fs.readFileSync('data.json', 'utf8');

  // Parse the existing data as JSON
  const data = JSON.parse(existingData);

  // Add the new object to the data
  data.push(newObject);

  // Convert the data back to JSON
  const jsonData = JSON.stringify(data, null, 2);

  // Write the updated data to the file
  fs.writeFileSync('data.json', jsonData, 'utf8');
  // Send a response indicating the successful creation of the object
  res.status(201).json(newObject);
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const {title, description } = req.body;

  // Add the new object to your data source or storage
  const existingData = fs.readFileSync('data.json', 'utf8');

  // Parse the existing data as JSON
  const data = JSON.parse(existingData);

  const index = data.findIndex((obj) => obj.id == id);

  // If the index is found (object with the matching ID exists)
  if (index !== -1) {
    // Update the object with the provided data
    data[index] = { id, title, description };

    // Convert the data back to JSON
    const updatedJsonData = JSON.stringify(data, null, 2);

    // Write the updated data back to the file
    fs.writeFileSync('data.json', updatedJsonData, 'utf8');

    console.log(`Object with ID ${id} updated successfully.`);
  } else {
    console.log(`Object with ID ${id} not found.`);
  }

  res.send(`Object with ID ${id} updated successfully.`)
});