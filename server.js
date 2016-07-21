
var express = require('express');
var nodemailer = require('nodemailer');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var Promise = require('bluebird');

mongoose = Promise.promisifyAll(require('mongoose'));
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/tickets');

models = require('./app/models');

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);


/**
 * Config mail
 * Configure your google mail accounte
 */
var transporter = nodemailer.createTransport('smtps://xxxxxxx%40gmail.com:password@smtp.gmail.com');

io.on('connection', function (socket) {

    console.log("New user connected ... ");

    socket.on('add comment', function (response) {

        io.emit('receive comment', {
            message : response.user.lastname + " vient de deposer un commentaire sur un ticket",
            comment : response
        });

        var mailOptions = {
            from: 'xxxxxxxx@gmail.com',
            to: response.user.email, // list of receivers
            subject: 'Bonjour', // Subject line
            text: "Un nouveau commentaire vient d'être posté" +
            "sur le ticket suivant " + response.ticket.title
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    });

});

server.listen(8080);