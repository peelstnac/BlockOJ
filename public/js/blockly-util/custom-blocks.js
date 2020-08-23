// Parse to Number
Blockly.Blocks['math_convertToNumber'] = {
    init: function() {
        this.appendValueInput("value")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("convert to number");
        this.setOutput(true, "Number");
        this.setStyle('math_blocks');
        this.setTooltip("Converts the given value to a number.");
    }
};

Blockly.JavaScript['math_convertToNumber'] = function(block) {
    var v = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    v = 'Number(' + v + ')';
    return [ v, Blockly.JavaScript.ORDER_NONE ];
};