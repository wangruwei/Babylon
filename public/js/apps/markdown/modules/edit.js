'use strict';
define(['knockout', 'Super', 'Tools', 'sweet'], function (ko, Super, Tools, sweet) {
    return function (context) {
        var self = Super.call(this, context);

        self.title = ko.observable('');
        self.content = ko.observable('');
        self.markdownList = self.parent.markdownList;
        self.articleId = context.id || -1;
        self.editType = ko.observable(context.id == 'add' ? 'add' : 'edit');
        self.title = ko.observable('');
        self.content = ko.observable('');
        if(self.editType() == 'edit'){
            Tools.ajax({
                url: '/markdown/article.vpage',
                type: 'GET',
                data: {
                    articleId: self.articleId
                },
                success: function(returnData){
                    if(returnData.success){
                        self.title(returnData.data.article.title);
                        self.content(returnData.data.article.content);
                    }
                }
            });
        }

        self.edit = function(){
        	Tools.ajax({
        		url: '/markdown/edit.vpage',
        		type: 'POST',
        		data: {
        			title     : self.title(),
        			content   : self.content(),
                    editType  : self.editType(),
                    articleId : self.articleId
        		},
        		success: function(returnData){
                    console.log(returnData);
                    if(returnData.success){
                        sweet('Great...', '发布成功!', 'success');
                        self.markdownList([returnData.data.article].concat(self.markdownList()));
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