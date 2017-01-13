'use strict';
define(['knockout', 'Super', 'Tools', 'highlight'], function (ko, Super, Tools, hl) {
    return function (context) {
        var self = Super.call(this, context);

        self.markdownList = self.parent.markdownList;
        self.title = ko.observable('');

        self.delete = function(data){
            var articleId = data._id;
            self.sweet({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                Tools.ajax({
                    url: '/markdown/delete.vpage',
                    type: 'POST',
                    data: {
                        articleId: articleId
                    },
                    success: function(returnData){
                        if(returnData.success){
                            self.markdownList.shift();
                            self.sweet('Great...', returnData.info || '删除成功!', 'success');
                        }else{
                            self.sweet('Oops...', returnData.info || '删除失败!', 'error');
                        }
                    }
                });
            })
            .catch(self.sweet.noop)
        };

        self.search = function(){
            Tools.ajax({
                url: '/markdown/search.vpage',
                type: 'GET',
                data: {
                    title: self.title() || ''
                },
                success: function(returnData){
                    console.log(returnData.data.markdownList);
                    self.markdownList(returnData.data.markdownList);
                }
            });
        };

        $(document.body).one('pageReady', function(){
        	$('.ui.accordion').accordion();
            $(document).ready(function() {
                $('pre code').each(function(i, block) {
                    hl.highlightBlock(block);
                });
            });
            $('.delete_btn').bind('click',function(){
                return false;
            });
            $(this).bind('keyup', function(ev){
                if(ev.keyCode == 13){
                    self.search();
                }
            });
        });

        if (self.data.test) {
            window.list = self;
        }
    };
});