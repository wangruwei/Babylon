'use strict';

define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        console.log('this is markdown list');

        if (self.data.test) {
            window.list = self;
        }
    };
});