'use strict';
define(['knockout', 'Super', 'Tools', 'sweet'], function (ko, Super, Tools, sweet) {
    return function (context) {
        var self = Super.call(this, context);

        self.title = ko.observable('');
        self.content = ko.observable('');

        self.edit = function(){
        	Tools.ajax({
        		url: '/markdown/edit.vpage',
        		type: 'POST',
        		data: {
        			title   : self.title(),
        			content : self.content()
        		},
        		success: function(returnData){
                    console.log(returnData);
                    if(returnData.success){
                        sweet('Great...', '发布成功!', 'success');
                        window.history.go(-1);
                    }else{
                        sweet('Oops...', returnData.info || '发布失败!', 'error');
                    }
        		}
        	});
        };

        if (self.data.test) {
            window.edit = self;
        }
    };
});