const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.get('/api/users', (req, res) => {
    // Logic to fetch users from the database
    res.json({ message: 'GET request to /api/users' });
});

app.post('/api/users', (req, res) => {
    // Logic to create a new user in the database
    res.json({ message: 'POST request to /api/users' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
