'use strict';
define(['knockout', 'Super', 'sammy', 'Tools'], function (ko, Super, Sammy, Tools) {
    return function (context) {
        var self = Super.call(this, context);

        self.markdownList = ko.observableArray(self.data.markdownList);

        Sammy(function(){
            this.get(/\#\/([^/]+)\/([^/]+)/, function(){
                var module = this.params.splat[0];
                var id = this.params.splat[1];

                self.palette({
                    name        : self.data.getJS(module),
                    template    : self.data.getTemp(module),
                    data        : {
                        parent  : self,
                        data    : self.data,
                        module  : module,
                        id      : id
                    },
                    afterRender : function(){
                        $(document.body).trigger('pageReady');
                    }
                });
            });

            this.get(self.data.appUrl, function(){
                this.app.runRoute('get', '#/list/0');
            });
        });

        Sammy().run();

        if (self.data.test) {
            window.main = self;
        }
    };
});