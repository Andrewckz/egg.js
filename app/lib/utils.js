const crypto = require('crypto');

module.exports = {
    md5(text) {
        return crypto.createHash('md5').update(text, 'utf8').digest('hex');
    },
};