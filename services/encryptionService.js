const crypto = require('crypto');
const {constants} = require('../helpers/constants');

module.exports.getEncryptedText = (req, res, next) => {
    var cipherEnc = crypto.createCipher(constants.encryption.algorithm, constants.encryption.key);
    var encryptedResponse = cipherEnc.update(req.params.text, 'utf8', 'hex') + cipherEnc.final('hex');
    return encryptedResponse;
};