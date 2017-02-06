requirejs.changePath = function(map, key){
    var mapKey = key.substring(1, key.length) + '.js';
    var result = '/' + map[mapKey].substring(0, map[mapKey].length - 3);
    return result ? result  : key;
};
requirejs.config({
    baseUrl: '/js',
    paths: {
    	// js
    	'jquery'          : '/js/lib/jquery/3.1.1/jquery',
    	'semantic'        : '/js/lib/semantic/2.2.6/semantic',
    	'knockout'        : '/js/lib/knockout/3.4.1/knockout',
    	'ko-amd'          : '/js/lib/knockout-amd-helper/0.7.4/knockout-amd-helpers',
    	'text'            : '/js/lib/text/2.0.15/text',
        'sammy'           : '/js/lib/sammy/0.7.6/sammy',
        'highlight'       : '/js/lib/highlight/9.9.0/highlight',
        'sweet'           : '/js/lib/sweetalert2/6.3.8/sweetalert2',

        'Tools'           : '/js/tools/Tools',
        'Super'           : '/js/tools/Super',

    	// css
        'highlight-css'   : '/js/lib/highlight/9.9.0/github',
        'sweet-css'       : '/js/lib/sweetalert2/6.3.8/sweetalert2'
    },
    shim: {
    	'semantic'  : ['jquery'],
    	'ko-amd'    : ['knockout', 'text'],
        'sweet'     : ['css!sweet-css'],
        'highlight' : ['css!highlight-css']
    },
    map: {
        '*': {
            'css' : '/js/lib/require-css/css.js'
        }
    }
});
