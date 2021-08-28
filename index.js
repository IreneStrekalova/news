require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT;
require('./src/db/dbConnect');
const newsRoute = require('./src/routes/news');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/news', newsRoute);

app.use((err, req, res, next) => {
    if (!err.status) err.status = 500;
    if (!err.message) err.message = 'Something is wrong';
    res.status(err.status).send({ 'message': err.message });
    console.log('ERROR : ', err);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});