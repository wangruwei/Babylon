'use strict';

define(["knockout", "Super"], function (ko, Super) {
    return function (context) {
        var self = Super.call(this, context);

        alert(1);

        if (self.data.test) {
            window.detal = self;
        }
    };
});