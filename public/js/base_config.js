requirejs.config({
    baseUrl: '/js',
    paths: {
    	// js
    	'jquery'   : './lib/jquery/jquery-3.1.1',
    	'semantic' : './lib/semantic/semantic',
    	'knockout' : './lib/knockout/knockout-3.4.1',
    	'ko-amd'   : './lib/knockout-amd-helper/build/knockout-amd-helpers.min',
    	'text'	   : './lib/text/text',
        'sammy'    : './lib/sammy/sammy-latest.min',

 		'Tools'    : './tools/Tools',
        'Super'    : './tools/Super'

    	// css
    	// 'semantic-css': './lib/semantic/semantic'
    },
    shim: {
    	'semantic': ['jquery'],
    	'ko-amd'  : ['knockout', 'text']
    },
    map: {
        '*': {
            'css' : './lib/require-css/css.js'
        }
    }
});