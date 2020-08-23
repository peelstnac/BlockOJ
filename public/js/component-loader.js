for (const template of document.getElementsByTagName('template')) {
	customElements.define(template.id,
		class extends HTMLElement {
			constructor() {
				super();
				let templateContent = template.content;

				const shadowRoot = this.attachShadow({ mode: 'open' })
					.appendChild(templateContent.cloneNode(true));
			}
		}
	);
}