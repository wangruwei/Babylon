define(['jquery', 'semantic'], function($){
	var appUrl  = 'public/js/apps/';
	var modules = modules || {};

	return {
		getJS   : function(appName){
			return function(fileName){
				var test = params.test;
				return test ? '/js/apps/' + appName + '/modules/' + fileName + '.js'
			        	    : '/' + modules['js/apps/' + appName + '/modules/' + fileName + '.js'];
			};
		},
		getTemp : function(appName){
			return function(fileName){
				var test = params.test;
				return test ? 'js/apps/' + appName + '/templates/' + fileName
					        : 'js/apps/' + appName + '/templates/' + fileName;
			};
		},
		ajax    : function(options){
			$('#loading-wrapper').show();
			$.ajax({
				url     : options.url,
				type    : options.type.toUpperCase() || 'POST',
				data    : options.data || {},
				success : function(json){
					$('#loading-wrapper').hide();
					options.success && options.success(json);
				},
				error   : function(){
					$('#loading-wrapper').hide();
					options.success && options.success(json);
				}
			});
		}
	};
});