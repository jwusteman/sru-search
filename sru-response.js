import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-input/iron-input.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronA11yKeysBehavior} from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';

/**
 * `sru-search`
 * A material design element for searching using the SRU standard
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SruRecords extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: block;
          height: 80vh;
        }
      </style>
      <slot></slot>
      `;
    }
    ready(){
        super.ready();
        var tags = { 'dc-creator': 'creator', 'dc-title': 'title' };
        for (let tag in tags) {
            var elements = this.querySelectorAll(tag);
            for (let i=0; i<elements.length; i++) {
                elements[i].setAttribute("slot", tags[tag]);
            }
        }
        
    }
};
window.customElements.define('sru-records', SruRecords);
    
class SruRecord extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: block;
          border: 1px outset darkgrey;
          max-height: 10em;
          overflow: hidden;
        }
        :host(:hover) {
        overflow: scroll;
        max-height: 25em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('sru-record', SruRecord);

class SruRecordpacking extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: none;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('sru-recordpacking', SruRecordpacking);

class SruRecordschema extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: none;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('sru-recordschema', SruRecordschema);

class DcDc extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .creators:before {
            content: "Authors: "
        }
      </style>
      <slot name="title"></slot>
      <div class="creators">
          <slot name="creator"></slot>
      </div>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-dc', DcDc);

class DcContributor extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .dc-contributor {
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-contributor', DcContributor);

class DcCreator extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        :host:after {
           content: ", "
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-creator', DcCreator);

class DcDate extends PolymerElement {
    static get template() {
    return html`
      <style>
    :host:before {
        content: "Publication Date: ";
    }        

        :host {
          display: block;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-date', DcDate);

class DcFormat extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: block;
            font-face: "Consolas",
            font-size: 0.9em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-format', DcFormat);

class DcText extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-text', DcText);

class DcIdentifier extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .dc-identifier {
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-identifier', DcIdentifier);

class DcTitle extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
            display: block;
            font-weight: 600;
            font-size: 1.3em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-title', DcTitle);

class DcDescription extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
            display: block;
            font-face: "Consolas",
            font-size: 0.9em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-description', DcDescription);

class DcSubject extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
            display: block;
            font-weight: 600;
            font-size: 1.3em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-subject', DcSubject);

class DcLanguage extends PolymerElement {
    static get template() {
    return html`
      <style>
    :host:before {
        content: "Language: ";
    }        
    :host {
            display: block;
            font-weight: 300;
            font-size: 1em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-language', DcLanguage);

class DcPublisher extends PolymerElement {
    static get template() {
    return html`
      <style>
    :host:before {
        content: "Publisher: ";
    }        

        :host {
            display: block;
            font-weight: 400;
            font-size: 1em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-publisher', DcPublisher);

class DcRelation extends PolymerElement {
    static get template() {
    return html`
      <style>
        :host {
            display: block;
            font-weight: 600;
            font-size: 1.3em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-relation', DcRelation);

class DcType extends PolymerElement {
    static get template() {
    return html`
      <style>
    :host:before {
        content: "Type: ";
    }        
    :host {
        display: block;
        font-weight: 300;
        font-size: 1em;
        }
      </style>
      <slot></slot>
        `;
    }
};
window.customElements.define('dc-type', DcType);

//class SruResponse extends  mixinBehaviors([IronA11yKeysBehavior], PolymerElement) {
class SruResponse extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .horizontal-holder {
				background: var(--background-color, white);
				display: block;
				padding: 0 16px;
				@apply --layout-horizontal;
				@apply --layout-center-center;
				height: var(--paper-search-bar-height, 48px); /* To resolve min-height bug on IE 11 */
				box-sizing: border-box;
			}
      </style>
      <div  class="horizontal-holder"></div>
    `;
  };
  static get properties() {
    return {
      			/**
			 * Text for which the user is searching
			 */
			query: {
				type: String,
				notify: true,
				value: ''
			},
			/**
			 * Icon shown in the search background
			 */
			icon: {
				type: String,
				value: 'search'
			},
			/**
			 * Text shown in the search box if the user didn't enter any query
			 */
			placeholder: {
				type: String,
				value: 'Search'
			},			/**
			 * Number of filters the user has selected (shown in the badge) (optional)
			 */
			nrSelectedFilters: {
				type: Number,
				value: 0
			},
                        keyBindings: {
                            'enter': '_search',
                            'enter:keypress': '_search'
                        }
    };
    }
    
    static get  keyBindings() {
        return {
            'enter': '_search',
            'enter:keypress': '_search'
        };
    };
  
    constructor() {
        super();
        // Resolve warning about scroll performance 
        // See https://developers.google.com/web/updates/2016/06/passive-event-listeners
        setPassiveTouchGestures(true);
    }
    
    ready(){
        super.ready();
        // Output the custom element's HTML tag to the browser console.
        // Open your browser's developer tools to view the output.
        console.log(this.tagName);
        this.focus();
    }
    
    _search () {
        console.log(`search for ${this.query}`);
        // `http://www.worldcat.org/webservices/catalog/search/worldcat/sru?query=srw.kw+all+"{$this.query}"&wskey={built-in-api-key}`
        // https://platform.worldcat.org/api-explorer/apis/wcapi/Bib/SRU
	this.fire('search-query-ready');
    }
    
    focus() {
	this.$.sruSearchInput.focus();
    }
};

export default SruResponse;
