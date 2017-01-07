define(['knockout'], function(ko){
	return function(context){
		var self = this;

		self.parent  = context.parent;
		self.data    = context.data;
		self.palette = ko.observable({});

		return self;
	};
});