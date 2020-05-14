const express = require('express');
const exphbs = require('express-handlebars');
const operations = require('./Operations')

const app = express();

//Body json Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage view
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    });
});

app.get('/multiply', (req, res) => {
    operation = operations.filter(member => member.id === 1)[0];
    if(operation){
        res.render('index', {
            name: "Multiply",
            operation: operation,
            result: (operation.x * operation.y)
        });
    }
    else
        res.status(400).json({ msg: "Operation not found"});
});

app.get('/division', (req, res) => {
    operation = operations.filter(member => member.id === 4)[0];
    if(operation){
        res.render('index', {
            name: "Division",
            operation: operation,
            result: (operation.x / operation.y)
        });
    }
    else
        res.status(400).json({ msg: "Operation not found"});
});


app.get('/add', (req, res) => {
    operation = operations.filter(member => member.id === 2)[0];
    if(operation){
        res.render('index', {
            name: "Add",
            operation: operation,
            result: (operation.x + operation.y)
        });
    }
    else
        res.status(400).json({ msg: "Operation not found"});
});

app.get('/subtract', (req, res) => {
    operation = operations.filter(member => member.id === 3)[0];
    if(operation){
        res.render('index', {
            name: "Subtraction",
            operation: operation,
            result: (operation.x - operation.y)
        });
    }
    else
        res.status(400).json({ msg: "Operation not found"});
});


// Handlebard middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


const PORT = 3000;
 
app.listen(PORT, () => console.log(`Server started on ${PORT}`))

module.exports = { app };