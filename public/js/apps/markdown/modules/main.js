'use strict';
define(['knockout', 'Super', 'sammy', 'Tools'], function (ko, Super, Sammy, Tools) {
    return function (context) {
        var self = Super.call(this, context);

        Sammy(function(){
            this.get(/\#\/([^/]+)/, function(){
                var module = this.params.splat[0];

                self.palette({
                    name        : self.data.getJS(module),
                    template    : self.data.getTemp(module),
                    data        : {
                        parent  : self,
                        data    : self.data,
                        module  : module
                    },
                    afterRender : function(){
                        $(document.body).trigger('pageReady');
                    }
                });
            });

            this.get(self.data.appUrl, function(){
                this.app.runRoute('get', '#/list');
            });
        });

        Sammy().run();

        if (self.data.test) {
            window.main = self;
        }
    };
});