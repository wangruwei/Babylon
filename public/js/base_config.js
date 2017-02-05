requirejs.changePath = function(map, key){
    var mapKey = key.substring(1, key.length) + '.js';
    var result = '/' + map[mapKey].substring(0, map[mapKey].length - 3);
    return result ? result  : key;
};
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
        'highlight'       : '/js/lib/highlight/lib/highlight',
        'sweet'           : '/js/lib/sweetalert2/dist/sweetalert2.min',

        'Tools'           : '/js/tools/Tools',
        'Super'           : '/js/tools/Super',

    	// css
        'highlight-css'   : '/js/lib/highlight/lib/styles/default',
        'sweet-css'       : '/js/lib/sweetalert2/dist/sweetalert2.min'
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
