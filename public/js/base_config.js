requirejs.config({
    baseUrl: '/js',
    paths: {
    	// js
    	'jquery'          : '/js/lib/jquery/jquery-3.1.1',
    	'semantic'        : '/js/lib/semantic/semantic',
    	'knockout'        : '/js/lib/knockout/knockout-3.4.1',
    	'ko-amd'          : '/js/lib/knockout-amd-helper/build/knockout-amd-helpers.min',
    	'text'            : '/js/lib/text/text',
        'sammy'           : '/js/lib/sammy/sammy-latest.min',
        'highlight'       : '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min',
        'sweet'           : 'https://cdn.jsdelivr.net/sweetalert2/6.3.1/sweetalert2.min',

        'Tools'           : '/js/tools/Tools',
        'Super'           : '/js/tools/Super',

    	// css
    	// 'semantic-css' : '/js/lib/semantic/semantic'
        'highlight-css'   : '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/default.min',
        'sweet-css'       : 'https://cdn.jsdelivr.net/sweetalert2/6.3.1/sweetalert2.min'
    },
    shim: {
    	'semantic'  : ['jquery'],
    	'ko-amd'    : ['knockout', 'text'],
        'sweet'     : ['css!sweet-css']
    },
    map: {
        '*': {
            'css' : '/js/lib/require-css/css.js'
        }
    }
});