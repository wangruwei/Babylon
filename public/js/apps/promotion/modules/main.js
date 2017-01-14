'use strict';

define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        $(document.body).one('pageReady', function(){
        	$('.special.cards .image').dimmer({
        	  on: 'hover'
        	});
        	$('.ui.dropdown').dropdown();
        });

        if (self.data.test) {
            window.main = self;
        }
    };
});