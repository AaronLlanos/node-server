'use strict';

angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
	.controller('SignupCtrl', function ($scope, $http, facebook) { // note the added $http depedency

		
		// Here we're creating some local references
		// so that we don't have to type $scope every
		// damn time
		var user, signup, login;

		// Here we're creating a scope for our Signup page.
		// This will hold our data and methods for this page.
		$scope.signup = signup = {};

		// Here we're creating a scope for our login page.
		// This will hold our data and methods for this page.
		$scope.login = login = {};

		// In our signup.html, we'll be using the ng-model
		// attribute to populate this object.
		signup.user = login.user = user = {};

		// This is our method that will post to our server.
		signup.submit = function () {
			
			$scope.removeAlert();
			// make sure all fields are filled out...
			// aren't you glad you're not typing out
			// $scope.signup.user.firstname everytime now??
			if (
				!user.firstname ||
				!user.lastname ||
				!user.email ||
				!user.password1 ||
				!user.password2
			) {
				$scope.submitAlert(false, 'Please enter in all of the fields.');
				return false;
			}

			// make sure the passwords match
			if (user.password1 !== user.password2) {
				$scope.submitAlert(false, 'Your passwords must match.');
				return false;
			}

			// Just so we can confirm that the bindings are working
			// console.log(user);

			// Make the request to the server
			var request = $http.post('/signup', user);

			// we'll come back to here and fill in more when ready
			request.success(function (data) {
				// to be filled in on success
				// console.log(data);
				$scope.submitAlert(data.success, data.message);
			});

			request.error(function (data) {
				// to be filled in on error
				// console.log(data);
				$scope.submitAlert(data.success, data.message);
			});

		};

		signup.fbSubmit = function () {
			facebook.login().then(function (r) {
				console.log(r);
	            facebook.api("/me", facebook.API_METHOD.GET).then(function (resp) {
	            	user.email = resp;
	            	console.log(resp);
	            }, function (err){
	            	console.log(err);
	            });
	        }, function (err){
	            console.log(err);
	        });
		};

		login.submit = function () {
			$scope.removeAlert();
			// Make sure we have username and password filled out
			if (!user.email || !user.password) {
				$scope.submitAlert(false, 'Please fill out all form fields.');
				return false;
			}
			var request = $http.post('/login', user);

			// we'll come back to here and fill in more when ready
			request.success(function (data) {
				// to be filled in on success
				// console.log(data);
				$scope.submitAlert(data.success, data.message);
			});

			request.error(function (data) {
				// to be filled in on error
				// console.log(data);
				$scope.submitAlert(data.success, data.message);
			});
		};

		// Flash an alert upon success or error.
		$scope.submitAlert = function (success, message) {
			if (success){
				angular.element('.alert').removeClass('hidden').addClass('alert-success');
				angular.element('#alert-type').html('Success: ');
				angular.element('#alert-message').html(message);
			}else{
				angular.element('.alert').removeClass('hidden').addClass('alert-danger');
				angular.element('#alert-type').html('Error: ');
				angular.element('#alert-message').html(message);
			}
		};

		$scope.removeAlert = function () {
			angular.element('.alert').removeClass('alert-danger alert-success').addClass('hidden');
			angular.element('#alert-type').html('');
			angular.element('#alert-message').html('');
		};
		
	});