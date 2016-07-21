var schema = require('../schemas/schema');

exports.User = mongoose.model('User', schema.schemaUser);


exports.Ticket = mongoose.model('Ticket', schema.schemaTicket);


exports.Comment = mongoose.model('Comment', schema.schemaComment);