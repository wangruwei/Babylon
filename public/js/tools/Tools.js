define(['jquery', 'semantic'], function($){
	var appUrl = 'public/js/apps/';
	var test = params.test || false;
	console.log('test: ', test);
	return {
		getJS   : function(appName, test){
			return function(fileName){
				return test ? 'apps/' + appName + '/modules/' + fileName
					        : 'apps/' + appName + '/modules/' + fileName;
			};
		},
		getTemp : function(appName, test){
			return function(fileName){
				// console.log(modules['js/apps/' + appName + '/templates/' + fileName + '.html']);
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