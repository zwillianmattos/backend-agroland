const crypto = require('crypto');

// Parâmetrização de criptografia
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports = {
    /**
     * Criptograda uma String
     * @param {String} text valor a ser criptografado
     * @returns - Dado criptografado e chave para descriptografar 
     */
    encrypt(text) {
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {
            iv: iv.toString('hex'),
            encryptedData: encrypted.toString('hex')
        };
    },
    /**
     * Descriptografa a String
     * @param {*} text valor a ser descriptografado
     * @returns - Dado descriptografado
     */
    decrypt(text) {

        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');


        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
};
