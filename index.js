import template from 'babel-template';

const drupalBehavior = template('Drupal.behaviors.myBehavior = {attach: function (context, settings) {\nBODY;\n}};');

export default function (babel) {
	var t = babel.types;

	return {
		visitor: {
			Program: {
				exit: function (path) {
					if (!this.drupalBehavior) {
						this.drupalBehavior = true;
						var addBehavior = drupalBehavior({
							BODY: path.node.body
						});
						addBehavior[1].expression.callee.body.directives = path.node.directives;

						path.replaceWith(
							t.program(addBehavior)
						);
					}
					path.node.directives = [];
				}
			}
		}
	};
};