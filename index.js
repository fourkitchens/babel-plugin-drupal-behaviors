const template = require('babel-template');

const drupalBehavior = template(`Drupal.behaviors.NAME = {attach: function (context, settings) {BODY}};`);

module.exports = function (babel) {
  const t = babel.types;

	return {
    inherits: require("babel-plugin-transform-strict-mode"),
		visitor: {
			Program: {
				exit (path) {
					if (!this.drupalBehavior) {
            this.drupalBehavior = true;

            function getRandomNumber(max) {
              return Math.floor(Math.random() * Math.floor(max));
            }
            const randomNum = getRandomNumber(1000).toString();

						const addBehavior = drupalBehavior({
              NAME: t.identifier('name' + randomNum),
              BODY: path.node.body
            });

						path.replaceWith(
							t.program([addBehavior])
						);
					}
					path.node.directives = [];
				}
			}
		}
	};
};
