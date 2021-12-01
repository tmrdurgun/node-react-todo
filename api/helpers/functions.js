const crypto = require('crypto');

const generateIdWithPrefix = async (length, prefix) => `${prefix}${crypto.randomBytes(length).toString('hex')}`;

module.exports = {
  generateIdWithPrefix,
};