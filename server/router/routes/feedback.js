// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Feedback = db.feedback;

router.post('/', function (req, res) {
	var body = req.body;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

	//Save the feedback in the system and email notification!!!!!!
	console.log('Saving feedback at ' + color.green(time) + ' with name: ' + color.green(body.firstname));

    // setup the new user
    var newFeedback = new Feedback({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        comment: body.comment,
        rating: body.rating,
        date: new Date()
    });

    newFeedback.save (function (err) {
    	if (err) {
    		console.log('Problem saving feedback by user: ' + color.red(body.email) + ' With the error: ' + color.red(err));
    		res.status(500).json({
                'success': false,
                'message': 'Database error trying to leave feedback.  Please notify your Aaron Llanos!.'
            });
    	}else{
            console.log('Successfully saved feedback at ' + color.green(time));
            res.status(200).json({
                'success': true,
                'message': 'Successfully left feedback! Thank you!'
            });
        }

    });

});

module.exports = router