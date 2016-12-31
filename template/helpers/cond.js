var hljs = require('highlight.js');
var Handlebars = require('handlebars');

module.exports.register = function(handlebars) {
	handlebars.registerHelper({
		eq: function (v1, v2) {
			return v1 === v2;
		},
		ne: function (v1, v2) {
			return v1 !== v2;
		},
		lt: function (v1, v2) {
			return v1 < v2;
		},
		gt: function (v1, v2) {
			return v1 > v2;
		},
		lte: function (v1, v2) {
			return v1 <= v2;
		},
		gte: function (v1, v2) {
			return v1 >= v2;
		},
		and: function (v1, v2) {
			return v1 && v2;
		},
		or: function (v1, v2) {
			return v1 || v2;
		}
	});

	handlebars.registerHelper('SYNTAX', function(options){
		var output;
		if (this.markup.endsWith('.hbs')) {
			template = handlebars.compile('{{> ' + this.markup.replace('.hbs', '') + ' }}');
			output = template();
	    } else {
	      	output = this.markup;
	    }

		return new Handlebars.SafeString(hljs.highlight('html', output).value);
	});

	handlebars.registerHelper('CSS', function(string){
		var data = string[0].split(',');
		var result = [];
		for(var i = 0; i < data.length; i++){
			if(data[i].split('.').pop() == 'css'){
				result.push('<link rel="stylesheet" href="'+data[i]+'">');
			}
		}

		return result.join("\n\t");
	});

	handlebars.registerHelper('JS', function(string){
		var data = string[0].split(',');
		var result = [];
		for(var i = 0; i < data.length; i++){
			if(data[i].split('.').pop() == 'js'){
				result.push('<script src="'+data[i]+'"></script>');
			}
		}
		return result.join("\n\t");
	});
};