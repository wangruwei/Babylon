'use strict';
define(['knockout', 'Super', 'Tools'], function (ko, Super, Tools) {
    return function (context) {
        var self = Super.call(this, context);

        self.username   = ko.observable('');
        self.password   = ko.observable('');
        self.repassword = ko.observable('');
        self.errorMsg   = ko.observable('');

        self.register = function(){
        	self.errorMsg('');
        	if(!self.username() || !self.password() || !self.repassword()){
        		self.errorMsg('信息填写不完整');
        		return false;
        	}
        	if(self.password() != self.repassword()){
        		self.errorMsg('两次输入密码不一致');
        		return false;
        	}
        	Tools.ajax({
        		url  : '/register.vpage',
        		type : 'POST',
        		data : {
        			username   : self.username(),
        			password   : self.password(),
        			repassword : self.repassword()
        		},
        		success: function(returnData){
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
                    self.register();
                }
            });
        });

        if (self.data.test) {
            window.register = self;
        }
    };
});