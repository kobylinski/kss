"use strict";

const KssBuilderBase = require("kss/builder/base/handlebars");
const hljs = require("highlight.js");
const fs = require("fs");
const path = require("path");
class Builder extends KssBuilderBase {
  constructor() {
    super();

    this.API = "3.0";
  }

  prepare(styleGuide) {
    return super.prepare(styleGuide).then((styleGuide) => {
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
        },
      });

      this.Handlebars.registerHelper("SYNTAX", function (options) {
        var output;
        if (this.markup.endsWith(".hbs")) {
          var template = _hbs.compile(
            "{{> " + this.markup.replace(".hbs", "") + " }}"
          );
          output = template();
        } else {
          output = this.markup;
        }
        return new _hbs.SafeString(
          hljs.highlight(output, { language: "html" }).value
        );
      });

      this.Handlebars.registerHelper("LINK", function (content) {
        return content.replace(
          /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim,
          '<a href="mailto:$1">$1</a>'
        );
      });

      this.Handlebars.registerHelper("CUSTOM", function (place, input) {
        var tmpl = input.find(function (el) {
          if (el.endsWith(".hbs")) {
            var p = path.resolve(el);
            if (fs.existsSync(p)) {
              return place === path.basename(p, ".hbs");
            }
          }
          return false;
        });

        if (tmpl) {
          var p = path.resolve(tmpl);
          var template = _hbs.compile(fs.readFileSync(p).toString("utf8"), {
            noEscape: true,
          });
          return template(require(path.resolve("package.json")));
        }
        return input;
      });

      this.Handlebars.registerHelper("CSS", function (string) {
        if (!string.length) {
          return "";
        }

        console.log(string);

        var data = string[0].split(",");
        var result = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].split(".").pop() == "css") {
            result.push('<link rel="stylesheet" href="' + data[i] + '">');
          }
        }

        return result.join("\n\t");
      });

      this.Handlebars.registerHelper("JS", function (string) {
        if (!string.length) {
          return "";
        }

        var data = string[0].split(",");
        var result = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].split(".").pop() == "js") {
            result.push('<script src="' + data[i] + '"></script>');
          }
        }
        return result.join("\n\t");
      });

      return Promise.resolve(styleGuide);
    });
  }
}

module.exports = Builder;
