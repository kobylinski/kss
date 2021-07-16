'use strict';

const KssBuilderHandlebars = require('kss/builder/handlebars');
const hljs = require('highlight.js');


class Builder extends KssBuilderHandlebars {

  prepare(styleGuide) {
    return super.prepare(styleGuide).then(styleGuide => {

    	var _hbs = this.Handlebars;

    	this.Handlebars.registerHelper({
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

		this.Handlebars.registerHelper('SYNTAX', function(options){
			var output;
			if (this.markup.endsWith('.hbs')) {
				template = _hbs.compile('{{> ' + this.markup.replace('.hbs', '') + ' }}');
				output = template();
		    } else {
		      	output = this.markup;
		    }
			return new _hbs.SafeString(hljs.highlight(output, {language: 'html'}).value);
		});

		this.Handlebars.registerHelper('CSS', function(string){
			if(!string.length){
				return '';
			}

			var data = string[0].split(',');
			var result = [];
			for(var i = 0; i < data.length; i++){
				if(data[i].split('.').pop() == 'css'){
					result.push('<link rel="stylesheet" href="'+data[i]+'">');
				}
			}

			return result.join("\n\t");
		});

		this.Handlebars.registerHelper('JS', function(string){
			if(!string.length){
				return '';
			}

			var data = string[0].split(',');
			var result = [];
			for(var i = 0; i < data.length; i++){
				if(data[i].split('.').pop() == 'js'){
					result.push('<script src="'+data[i]+'"></script>');
				}
			}
			return result.join("\n\t");
		});

      return Promise.resolve(styleGuide);
    });
  }
}

module.exports = Builder;