define(['jquery', 'semantic'], function($){
	return {
		getJS   : function(appName, fileName){
			return function(fileName){
				return '/js/apps/' + appName + '/modules/' + fileName + '.js'
			};
		},
		getTemp : function(appName, fileName){
			return function(fileName){
				return appName + '/templates/' + fileName;
			};
		},
		ajax    : $.ajax
	};
});