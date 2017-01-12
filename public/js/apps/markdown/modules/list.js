'use strict';
define(['knockout', 'Super', 'highlight'], function (ko, Super, hl) {
    return function (context) {
        var self = Super.call(this, context);

        self.docList = ko.observableArray([1, 1, 1, 1, 1]);

        $(document.body).one('pageReady', function(){
        	$('.ui.accordion').accordion();
        });

        if (self.data.test) {
            window.list = self;
        }
    };
});