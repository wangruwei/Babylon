'use strict';

define(['knockout', 'Super', 'Tools'], function (ko, Super, Tools) {
    return function (context) {
        var self = Super.call(this, context);

        self.username = ko.observable('');
        self.password = ko.observable('');

        self.errorMsg = ko.observable('');
        self.login = function(){
            self.errorMsg('');
            if(!self.username() || !self.password()){
                self.errorMsg('帐号或密码错误');
                return false;
            }
            Tools.ajax({
                url: '/login.vpage',
                type: 'POST',
                data: {
                    username: self.username(),
                    password: self.password()
                },
                success: function(returnData){
                    console.log(returnData);
                    if(returnData.success){
                        window.location.href = returnData.data.url;
                    }else{
                        self.errorMsg(returnData.info);
                    }
                }
            });
        };

        $(document.body).one('pageReady', function(){
            $(this).bind('keyup', function(ev){
                if(ev.keyCode == 13){
                    self.login();
                }
            });
        });

        if (self.data.test) {
            window.login = self;
        }
    };
});