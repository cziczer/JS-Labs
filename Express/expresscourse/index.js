const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')

const app = express();

//Body json Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage view
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Shrek',
        members
    });
});

// Init middleware, everytime we do request logger works
// app.use(logger); 

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// }); //route and function

// Handlebard middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// //Set staic folder
// app.use(express.static(path.join(__dirname, "public")));//when we want use middleware

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => console.log(`Server started on ${PORT}`))