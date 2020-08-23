// region Monkey patching I/O

// Most of this code is just copied from the minified source. Since the goal
// isn't to rewrite their functionalities entirely, most uglified code has
// been left untouched or simply reformatted.
Blockly.JavaScript.text_print = function (a) {
	const code = Blockly.JavaScript.valueToCode(a, 'TEXT', Blockly.JavaScript.ORDER_NONE) || "''";
	// window.alert -> console.log
	return 'console.log(' + code + ');\n';
};

Blockly.JavaScript.text_prompt = Blockly.JavaScript.text_prompt_ext = function (a) {
	// Remove prompt argument
	let b = 'window.prompt()';
	if ('NUMBER' === a.getFieldValue('TYPE'))
		b = 'Number(' + b + ')';
	return [ b, Blockly.JavaScript.ORDER_FUNCTION_CALL ];
};

Blockly.Blocks.text_prompt_ext = {
	init: function () {
		let a = [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'], [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']];
		this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
		this.setStyle('text_blocks');
		const b = this;
		a = new Blockly.FieldDropdown(a, function (a) {
			b.updateType_(a);
		});

		// Remove input
		// this.appendValueInput("TEXT").appendField(a, "TYPE");
		this.appendDummyInput().appendField(a, 'TYPE');

		this.setOutput(!0, 'String');
		this.setTooltip(function () {
			return 'TEXT' === b.getFieldValue('TYPE') ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
		});
	},
	updateType_: function (a) {
		this.outputConnection.setCheck('NUMBER' === a ? 'Number' : 'String')
	},
	mutationToDom: function () {
		const a = Blockly.utils.xml.createElement('mutation');
		a.setAttribute('type', this.getFieldValue('TYPE'));
		return a;
	},
	domToMutation: function (a) {
		this.updateType_(a.getAttribute('type'))
	}
};

// Custom messages
Blockly.Msg['TEXT_PROMPT_TYPE_NUMBER'] = 'prompt for number';
Blockly.Msg['TEXT_PROMPT_TYPE_TEXT'] = 'prompt for text';

// endregion


function compile (workspace) {
	return Blockly.JavaScript.workspaceToCode(workspace);
}