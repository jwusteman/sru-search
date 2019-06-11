/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class SRUResponseParser {
    constructor (xmlDoc) {
        this.response = document.createDocumentFragment();
        var records = xmlDoc.getElementsByTagNameNS("http://www.loc.gov/zing/srw/", 'records');
        this.serialize(records[0], this.response);

    };
    
    serialize(element, outputParent) {
        var localName = this.resolveElementName(element);
        var outputElement = document.createElement(localName);
        if (element.hasAttributes()) {
            var attrs = element.attributes;
            for (var i = 0; i < attrs.length; i++) {
                var attr = attrs[i];
                if (!attr.name.startsWith("xmlns") && !attr.name.startsWith("xsi")) {
                    outputElement.setAttribute(attrs[i].name, attrs[i].value);
                }
            }
        }
        if (element.children.length === 0) {
            outputElement.innerHTML = element.innerHTML;
        } else {
            for (var i = 0; i < element.childNodes.length; i++) {
                var node = element.childNodes[i];
                if (node.nodeType === 3) {
                    var text = document.createTextNode(node.textContent);
                    outputElement.appendChild(text);
                } else if (node.nodeType === 8 ) {
                    // Ignore comment nodes
                } else {
                    this.serialize(node, outputElement);
                }
            }
        }
        outputParent.appendChild(outputElement);
    }

    
    html () {
        let serializer = new XMLSerializer();
        
        return serializer.serializeToString(this.response);
    }
    
    resolveElementName (element) {
        if (element.namespaceURI === 'http://www.loc.gov/zing/srw/') {
            return `sru-${element.localName}`;
        }
        if (element.namespaceURI.startsWith('http://purl.org/dc') || element.namespaceURI.includes('dc-schema') ) {
            return `dc-${element.localName}`;
        }
        return element.tagName;
    }
}
export default SRUResponseParser;



