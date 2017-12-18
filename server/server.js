const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;  // port set by heroku

app.use(express.static(publicPath));

// Serve index.html for all routes
app.get('*', (request, response) => {
    response.sendFile(path.join(publicPath, 'index.html'));
});

// listen to port 3000 for local machine
// Heroku will provide a dynamic value
app.listen(port, () => {
    console.log('Server is up!');
});