/**
 * This route will be used when a user wants to sign into their account. This could also be placed under "signup.js" but 
 * for the purpose of learning routes and to keep the flows seperately, we will creat this. If a user tries to signup 
 * but already exists in the database, it will be up to the front end to properly redirect and send the appropriate 
 * HTTP method to the correct route.
 */

// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

// Setup the Route
router.post('/', function (req, res) {
	var body = req.body;
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    Users.findOne({

    	'email': body.email

    }, function (err, user){
    	//If there is an error, log it and return it to the user.
    	if (err){
    		// Nice and concise log message
    		console.log('Couldn\'t log user ' + color.red(body.email) + ' at ' + color.red(time) + ' because of: ' + err);
    		 // send the error
            res.status(500).json({
                'success': false,
                'message': 'Internal server error from logging in user. Please contact support.'
            });
    	}
    	//No user exists, log the attempt and send a proper response.
    	if (!user){
    		// Log message
    		console.log('Couldn\'t find user by ' + color.red(body.email) + ' at ' + color.red(time));
    		res.status(409).json({
                'success': false,
    			'message': 'The specified email: ' + body.email + ' could not be found in the database. Please signup to use these services.'
    		});
    	}
    	//The user exists. Lets check his password and if it is correct lets log them in.
    	if (user){
            // setup the new user
            var password = body.password;
            user.comparePassword(password, function (err, isMatch){
            	if (err){
            		// Nice and concise log message
                    console.log('Couldn\'t log user ' + color.red(body.email) + ' at ' + color.red(time) + ' because of: ' + err);
                     // send the error
                    res.status(500).json({
                        'success': false,
                        'message': 'Internal server error from logging in user. Please contact support.'
                    });
            	}
            	if (isMatch) {
            		// Nice log message
            		console.log('Successfully logged in user ' + color.green(body.email) + ' at ' + color.green(time));
            		// After logging in the user, should send the user a time limit.
            		// Terminate after given amount of time which the front end will use to automatically
            		// remove the cookie used to keep the user signed in. 
            		res.status(200).json({
                        'success': true,
            			'message': 'Correctly logged in the user!'
            		});
            	}
                if (!isMatch) {
                    console.log('Incorrect password attempt for email: ' + color.red(body.email) + ' at ' + color.red(time));
                    res.status(409).json({
                        'success': false,
                        'message': 'Incorrect password was entered for email: ' + body.email
                    });
                }
            });
    	}
    });

});

// export the router for usage in our server/router/index.js
module.exports = router;
