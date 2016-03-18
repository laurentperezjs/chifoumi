const Game = require('./Game.jsx');
const ReactDom = require('react-dom');
const React = require('react');

ReactDom.render(<Game word="Hello"/>, document.getElementById('content'));