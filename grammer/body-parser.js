const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const port = 2007;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { name, year } = req.body;
    res.send(`Name: ${name}, Year: ${year}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});