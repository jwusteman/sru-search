import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-ajax/iron-ajax.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronA11yKeysBehavior} from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import SruSearchBar from './sru-search-bar.js';
import SRUResponseParser from './sru-parser.js';
import './sru-response.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

/**
 * `sru-search`
 * A material design element for searching using the SRU standard
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SruSearch extends  mixinBehaviors([IronA11yKeysBehavior], PolymerElement) {
    handleResponse(event, a,b, c) {
        var xml = event.detail.response;
        if (typeof xml !== "string") {
            var parser  = new SRUResponseParser(xml);
            this.$.searchResultsPanel.innerHTML = parser.html();
            this.$.searchResults.open();
        }
    }
//                url='http://localhost:8010/proxy/webservices/catalog/search/worldcat/sru?query=srw.kw all "{{query}}"&recordSchema=dc&wskey={built-in-api-key}'

    static get template() {
    return html`
      <style>
        :host {
          display: block;
        paper-dialog {
          overflow: scroll;
          height: 75vh;
        }
      </style>
        <div>
        <sru-search-bar icon="[[icon]]" query="{{query}}" placeholder="[[placeholder]]" id="sruSearchBar" >
        </sru-search-bar>
        <paper-dialog id="searchResults">
            <sru-search-bar icon="[[icon]]" query="{{query}}" placeholder="[[placeholder]]" id="sruSearchBar" >
            <iron-ajax
                auto id="sruSearchFetch"
                url='http://localhost:8010/proxy/HLAS?operation=searchRetrieve&version=1.1&query=all "{{query}}"&recordSchema=dc&maximumRecords=15'
                handle-as="document"
                on-response="handleResponse"
                debounce-duration="300">
            </iron-ajax>
            </sru-search-bar>
            <h2>Search Results</h2>
            <paper-dialog-scrollable id="searchResultsPanel">
            </paper-dialog-scrollable>
        </paper-dialog>
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
		value: 'James'
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
	},
        /**
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
        this.addEventListener('search-query-ready', this._search.bind(this));
        // Output the custom element's HTML tag to the browser console.
        // Open your browser's developer tools to view the output.
        console.log(this.tagName);
        this.focus();
    }
    
    _search () {
        console.log(`search for ${this.query}`);
//        this.$.sruSearchFetch.generateRequest();
        this.handleResponse( { detail: { response: "" }});
        this.$.searchResults.open();
	this.fire('changed');
    }
    
    focus() {
	this.$.sruSearchBar.focus();
    }
};

window.customElements.define('sru-search', SruSearch);
