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
class SruSearchBar extends  mixinBehaviors([IronA11yKeysBehavior], PolymerElement) {
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
        <div  class="horizontal-holder">
            <slot></slot>
            <iron-input bind-value="{{query}}">
                <input  is="iron-input"  id="sruSearchInput" on-input="_search" placeholder="[[placeholder]]" value="{{value::input}}"></input>
            </iron-input>
            <iron-icon icon="[[icon]]" class="icon"></iron-icon>
            <div class="logo"><slot name="logo"></slot></div>
        </div>
    `;
  }
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
	this.fire('search-query-ready');
    }
    
    focus() {
	this.$.sruSearchInput.focus();
    }
};

window.customElements.define('sru-search-bar', SruSearchBar);
export default SruSearchBar;
