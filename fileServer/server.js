var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var registry = require('./registry.js');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

global.registry = registry();

io.on('connection', function(socket) {

    console.log('new connection');
    console.log(socket.id);

    var body = this;
    global.names = [ 'Jared', 'Maria' ];

    socket.emit('name', body.names);

    socket.on('submit', function(data) {
        var newName = data;
        global.names.push(newName);
        console.log(global.names);
        socket.emit('update', body.names)
    });

    socket.on('request', function(data) {
        socket.emit(body.names);
    });

    global.registry.add(socket);
});

server.listen(8080)
console.log('\nSocket setup on 2015');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
