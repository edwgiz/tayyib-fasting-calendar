import {i18n} from './i18n.js'

class I18nTextNode extends HTMLElement {

  async connectedCallback() {
    const i18nKey = this.getAttribute('key');
    const text = await i18n(i18nKey);
    if (this.parentNode) {
      this.parentNode.replaceChild(document.createTextNode(text), this);
    }
  }
}

customElements.define('i18n-text', I18nTextNode);
