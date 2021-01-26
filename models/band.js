const { v4:uuidV4 } = require('uuid');

class Band {
    constructor(name = 'Default value') {
        this.id = uuidV4(); // Unique identifier
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;