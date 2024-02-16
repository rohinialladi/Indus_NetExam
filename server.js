const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

// Middleware to parse JSON data
app.use(bodyParser.json());

// In-memory data store (replace with a database in a real-world scenario)
let submittedEntries = [];

// Step 1: Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the User Details Form Server!');
});

// Step 2: API endpoint for handling form submissions
app.post('/submit-form', (req, res) => {
    // Step 3: Validate and process data on the server-side
    const { name, email, contactNumber } = req.body;

    // Step 4: Validate required fields
    if (!name || !email || !contactNumber) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    // Step 4: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // Step 5: Store the validated data in the in-memory data store
    const entry = { name, email, contactNumber };
    submittedEntries.push(entry);

    res.json({ message: 'Form submitted successfully', entry });
});

// Step 6: API endpoint for retrieving and displaying the list of all submitted entries
app.get('/submitted-entries', (req, res) => {
    res.json(submittedEntries);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
