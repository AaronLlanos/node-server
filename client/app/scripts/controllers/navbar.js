'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $timeout) {
    var notification;
  	$scope.notification = notification = {
  		show: false,
  		element: angular.element('#nav-alert'),
  		type: '',
  		message: ''
  	};

  	$scope.hideNavAlert = function (){
  		// console.log('hiding navalert');
  		notification.show = false;
    	notification.element.removeClass('bg-success').removeClass('bg-danger');
  	};

  	$rootScope.$on('notification:navalert-hide', $scope.hideNavAlert);

    $rootScope.$on('notification:navalert-show', function (event, data) {
  		console.log('showing navalert with notification: ');
    	notification.show = true;
    	notification.message = data.message;
    	if (data.success) {
    		notification.type = "Success:";
    		notification.element.addClass('bg-success');
    	}else{
    		notification.type = "Error:";
    		notification.element.addClass('bg-danger');
    	}
    	$timeout($scope.hideNavAlert, 4000);
    });
  });
