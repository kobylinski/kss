'use strict';

const KssBuilderBase = require('kss/builder/base/handlebars');
const hljs = require('highlight.js');


class Builder extends KssBuilderBase {

	constructor() {
    super();

    // Store the version of the builder API that the builder instance is
    // expecting; we will verify this in loadBuilder().
    this.API = '3.0';

    // this.addOptionDefinitions({
    //   'example-option': {
    //     string: true,
    //     description: 'This is a custom command-line option used by this Builder.'
    //   }
    // });
  }

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