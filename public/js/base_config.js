requirejs.config({
    baseUrl: '/js',
    paths: {
    	// js
    	'jquery'          : './lib/jquery/jquery-3.1.1',
    	'semantic'        : './lib/semantic/semantic',
    	'knockout'        : './lib/knockout/knockout-3.4.1',
    	'ko-amd'          : './lib/knockout-amd-helper/build/knockout-amd-helpers.min',
    	'text'            : './lib/text/text',
        'sammy'           : './lib/sammy/sammy-latest.min',
        'highlight'       : '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min',
        'sweet'           : 'https://cdn.jsdelivr.net/sweetalert2/6.3.1/sweetalert2.min',

 		'Tools'           : './tools/Tools',
        'Super'           : './tools/Super',

    	// css
    	// 'semantic-css' : './lib/semantic/semantic'
        'highlight-css'   : '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min',
        'sweet-css'       : 'https://cdn.jsdelivr.net/sweetalert2/6.3.1/sweetalert2.min'
    },
    shim: {
    	'semantic'  : ['jquery'],
    	'ko-amd'    : ['knockout', 'text'],
        'highlight' : ['css!highlight-css'],
        'sweet'     : ['css!sweet-css']
    },
    map: {
        '*': {
            'css' : '/js/lib/require-css/css.js'
        }
    }
});