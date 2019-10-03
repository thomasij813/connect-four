const express = require('express');

const app = express();

app.use('/', express.static('client'));

const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));