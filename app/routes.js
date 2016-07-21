var ticket = require('./controllers/tickets');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    app.post('/api/auth/login', ticket.login);


    // frontend routes =========================================================

    app.get('/api/create/users', ticket.createUsers);

    app.post('/api/tickets/create', ticket.create);

    app.get('/api/tickets', ticket.tickets);

    app.get('/api/tickets/delete/:ticket_id', ticket.delete);

    app.get('/api/tickets/one/:ticket_id', ticket.ticket);

    app.get('/api/tickets/comments/:ticket_id', ticket.comments);

    app.post('/api/tickets/add/comment', ticket.comment)

    app.get('/api/users', ticket.users);

    app.get('/api/users/:user_id', ticket.user);

    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });
};