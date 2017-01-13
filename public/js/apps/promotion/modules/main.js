'use strict';

define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        console.log('main');

        if (self.data.test) {
            window.main = self;
        }
    };
});