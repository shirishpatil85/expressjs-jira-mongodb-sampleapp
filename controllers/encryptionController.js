const {getEncryptedText}  = require('../services/encryptionService');

module.exports.encrypt = (req, res, next) => {
    res.send(getEncryptedText(req, res, next));
}