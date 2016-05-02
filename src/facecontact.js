var kad = require('kad');
var inherits = require('util').inherits;
var assert = require('assert');

var FaceContact = function (options) {
    if(!(this instanceof FaceContact)) {
        return new FaceContact(options);
    }

    assert(typeof options == 'object', 'Invalid options were supplied');
    assert(typeof options.address == 'string', 'Invalid address was supplied');
    assert(typeof options.port == 'number', 'Invalid port was supplied');
    assert(typeof options.facePort == 'number', 'Invalid facePort was supplied');

    this.address = options.address;
    this.port = options.port;
    this.facePort = options.facePort;

    //raindrop.Contact.call(this, options);
    kad.contacts.AddressPortContact.call(this, options);
};

//inherits(FaceContact, raindrop.Contact);
inherits(FaceContact, kad.contacts.AddressPortContact);

FaceContact.prototype._createNodeID = function() {
    return kad.utils.createID(this.address + ":" + this.port);
};

exports.FaceContact = FaceContact;
