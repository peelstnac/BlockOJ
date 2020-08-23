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

$('#compile').addEventListener('click', () => compile(workspace));


console.log(workspace);
function save (evt) {
	// Ignore events involving the UI like opening/closing
	// the toolbox.
	if (evt.type === Blockly.Events.UI) return;

	try {
		// Save to LS if a change was made
		BlocklyStorage.backupBlocks_(workspace);
		console.info('Sucessfully saved blocks to localStorage.');
	} catch (err) {
		console.error('Couldn\'t back up blocks to localStorage', err);
	}
}

workspace.addChangeListener(save);

// Automatically save when the user leaves the page
// Disabled because it might cause some issues and overwrite
// code if two instances of the page are open.
// BlocklyStorage.backupOnUnload(workspace);

// Restore blocks from a previous session from localStorage
setTimeout(BlocklyStorage.restoreBlocks, 0);