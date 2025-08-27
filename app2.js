const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const travelRoutes = require('./routes/travel');

const app = express();
const port = 2007;

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// travel 라우터 등록
const travelRouter = require('./routes/travel');
app.use('/travel', travelRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});