var itemsStatus = [
    "New",
    "In progress",
    "Done"
];

function status(key) {
    return itemsStatus[key]
}


exports.create = function (req, res) {
    models.User.findOne({
        _id: req.body.user_id
    }, function (err, resultat) {

        var ticket = new models.Ticket({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: status(0),
            createby: resultat._id
        });

        ticket.save();
        res.json();
    });

};


exports.createUsers = function (req, res) {

    var user1 = new models.User({
        username: "martin",
        password: "martin",
        firstname: "martin",
        lastname: "Dupond",
        email: "martin@yahoo.fr"
    });

    var user2 = new models.User({
        username: "sylvain",
        password: "sylvain",
        firstname: "sylvain",
        lastname: "Rollins",
        email: "sylvain@yahoo.fr"
    });

    var user3 = new models.User({
        username: "gaelle",
        password: "gaelle",
        firstname: "gaelle",
        lastname: "Bengamin",
        email: "gaelle@yahoo.fr"
    });

    user1.save();
    user2.save();
    user3.save();


    var data = {
        user1 : user1,
        user2 : user2,
        user3 : user3
    };


    res.json(data)
};


exports.delete = function (req, res) {
    models.Ticket.remove({
        _id: req.params.ticket_id
    }, function (err) {
        if (err) res.json({detete: false});
        else res.json({detete: true})
    })
};


exports.ticket = function (req, res) {
    models.Ticket.findOne({
        _id: req.params.ticket_id
    }).populate('createby').populate('comments.user').exec(function (err, ticket) {
        res.json(ticket)
    })
};


exports.users = function (req, res) {
    models.User.find({}, function (err, user) {
        res.json(user)
    });
};

exports.user = function (req, res) {
    models.User.findOne({
        _id: req.params.user_id
    }, function (err, user) {
        res.json(user)
    })
};


exports.tickets = function (req, res) {
    models.Ticket.find({}).populate('createby').exec(function (err, tickets) {
        res.json(tickets)
    });

};


exports.comments = function (req, res) {
    models.Comment.find({
        ticket: req.params.ticket_id
    }).populate('user').exec(function (err, comments) {
        res.json(comments)
    })
};

exports.comment = function (req, res) {
    var comment = new models.Comment({
        texte: req.body.texte,
        user: req.body.user,
        ticket: req.body.ticket
    });

    ///res.json(comment);

    comment.save(function (err, comment) {
        models.Comment.findOne({_id: comment._id}).populate('user').populate('ticket').exec(function (err, comment) {
            res.json(comment)
        })
    });
};

exports.login = function (req, res) {
    var data = {};
    models.User.findOne({
        username: req.body.username,
        password: req.body.password
    }, function (err, user) {
        if (!user) {
            data = {
                type: false,
                message: "Aucun utilisateur trouvé"
            };

        } else {
            data = {
                type: true,
                user: user
            };
        }
        res.json(data);
    });
};

