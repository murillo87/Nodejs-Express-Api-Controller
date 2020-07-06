const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

//Init middleware
//app.use(logger);

// handlebars Meddelware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Body Parser Middleware --POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

/*app.get('/', (req, res) => {
    //res.send('<h1>Hello World FK</h1>');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
//Member Api Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));