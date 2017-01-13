define(['knockout', 'sweet'], function(ko, sweet){
	return function(context){
		var self = this;

		self.parent  = context.parent;
		self.data    = context.data;
		self.palette = ko.observable({});

		self.sweet = sweet;

		return self;
	};
});