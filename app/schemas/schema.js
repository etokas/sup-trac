var schemaUser = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    birthday: {type: Date, default: Date.now},
    comments: [{type: mongoose.Schema.ObjectId, ref: "Comment"}],
    productowners: [{type: mongoose.Schema.ObjectId, ref: "Ticket"}],
    developers: [{type: mongoose.Schema.ObjectId, ref: "Ticket"}]
});

var schemaTicket = new mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    status: String,
    creation: {type: Date, default: Date.now},
    comments: [{type: mongoose.Schema.ObjectId, ref: "Comment"}],
    createby: {type: mongoose.Schema.ObjectId, ref: "User"},
    developerby: [{type: mongoose.Schema.ObjectId, ref: "User"}]
});


var schemaComment = new mongoose.Schema({
    texte: String,
    creation: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.ObjectId, ref: "User"},
    ticket: {type: mongoose.Schema.ObjectId, ref: "Ticket"}
});

/** Relation mongoose **/

exports.schemaUser = schemaUser;
exports.schemaComment = schemaComment;
exports.schemaTicket = schemaTicket;