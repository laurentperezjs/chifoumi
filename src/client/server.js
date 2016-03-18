const express = require('express');
const React = require('React');
const ReactDOMServer = require('react-dom/server');
const GameFactory = React.createFactory(require('./app/Game.jsx'));
import Home from './app/Home.jsx';

const app = express();

const port = process.env.PORT || 3000;
//const data = {word: 'Hello'};

const fetch = require('node-fetch');
function getData() {
    fetch('http://localhost:3000/word.json')
        .then(function (response) {
            return response.json()
        }).then(function (json) {
        console.log('fetch parsed json', json)
        return json;
    }).catch(function (ex) {
        console.error('fetch parsing failed', ex)
        return "parsing failed";
    })
};
app.set('views', __dirname);
app.use('/word.json', (req, res) => {
    console.log("requesting data");
    let data = {word: 'Hello'};
    res.json(data)
});

app.use('/index.html', (req, res) => {
    var h = new Home();
    console.log("/index.html" + h.sayHello());
    fetch('http://localhost:3000/word.json')
        .then(function (response) {
            return response.json()
        }).then(function (json) {
        console.log('fetch parsed json' + json);
        const reactHtml = ReactDOMServer.renderToString(GameFactory(json));
        debugger;
        res.render('index.ejs', {reactOutput: reactHtml});
    }).catch(function (ex) {
        console.error('fetch parsing failed', ex)
        return "parsing failed";
    })
});
app.use('/', express.static(`${__dirname}`));
//  app.use('/', (req, res)=> res.json(data));

app.listen(port, ()=> {
    console.log(`Website listening on port ${port}`);
    if (process.env.NODE_ENV === "production") {
        console.log('ENVIRONEMENT VARIABLES :');
        console.log(process.env);
    }
});