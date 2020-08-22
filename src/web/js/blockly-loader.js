// Only support English for now
// If we have time we can extend to support other languages
import Blockly from 'blockly/browser';
import 'blockly/msg/en';

import 'blockly/blockly_compressed';
import 'blockly/blocks_compressed';

const $ = document.querySelector.bind(document);
// const embed = $('blockly-embed').shadowRoot;
// const $_ = embed.querySelector.bind(embed);

const blockly = {
	area: $('#blockly-area'),
	container: $('#blockly-container'),
	toolbox: $('#blockly-toolbox'),
};

const workspace = Blockly.inject(blockly.container, {
	toolbox: blockly.toolbox,
	trashcan: true,
	toolboxPosition: 'start',
});

function resizeBlocklyContainer (evt) {
	let x = 0, y = 0;
	let el = blockly.area;

	do {
		x += el.offsetLeft;
		y += el.offsetTop;
		el = el.offsetParent;
	} while (el);

	blockly.container.style.left = x + 'px';
	blockly.container.style.top = y + 'px';
	blockly.container.style.width = blockly.area.offsetWidth + 'px';
	blockly.container.style.height = blockly.area.offsetHeight + 'px';
	Blockly.svgResize(workspace);
}


window.addEventListener('resize', resizeBlocklyContainer, false);

resizeBlocklyContainer();
Blockly.svgResize(workspace);