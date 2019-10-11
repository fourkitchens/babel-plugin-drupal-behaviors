const template = require('babel-template');

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const randomNum = getRandomNumber(1000);

const drupalBehavior = template('Drupal.behaviors.behavior' + randomNum + ' = {attach: function (context, settings) {\nBODY;\n}};');

module.exports = function (babel) {
  const t = babel.types;

	return {
    inherits: require("babel-plugin-transform-strict-mode"),
		visitor: {
			Program: {
				exit (path) {
					if (!this.drupalBehavior) {
            this.drupalBehavior = true;
            // console.log(path.node.body[0].expression.callee.body.directives)
						const addBehavior = drupalBehavior({
              BODY: path.node.body
            });

            // console.log(path.get('body'))
            // addBehavior.expression.callee.body.directives = path.node.directives;

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
