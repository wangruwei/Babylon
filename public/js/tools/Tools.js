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