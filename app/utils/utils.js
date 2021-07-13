const fs = require('fs');
const {
    decrypt
} = require('../config/crypto');



module.exports = {
    /**
 * Remove arquivos
 * @param {Array} files array de arquivos
 * @param {String} localDir diretorio do arquivo
 */
    removeFiles(files, localDir = './') {
        try {
            if (files) {
                if (Array.isArray(files)) {
                    files.forEach(file => {
                        // logger.info(`Removendo anexo: ${file.filename}`);
                        let path = file.path;
                        if (fs.existsSync(path))
                            fs.unlinkSync(`${localDir}/${path}`);
                    });
                } else {
                    console.log(fs.existsSync(path));
                    let path = file.filename;
                    if (fs.existsSync(path))
                        fs.unlinkSync(`${localDir}/${path}`);

                    console.log(`Local arquivo: ${localDir}/${path}`);
                }
            }
        } catch (e) {
            console.log(e)
            // logger.info(e);
        }
    },
    /**
     * Converte arquivos para base64
     * @param {Array} files aenxos a serem convertidos
     */
    filesToBase64(files) {

        let response = [];
        if (Array.isArray(files)) {

            try {
                files.forEach(file => {
                    let anexo = fs.readFileSync(decrypt(file.path));
                    response.push({
                        content: anexo.toString('base64'),
                        filename: decrypt(file.originalname),
                        type: file.mimetype,
                        disposition: 'attachment',
                        contentId: file.filename
                    });
                });

            } catch (e) {
                console.log(e);
                // logger.info(e);
            }

        }
        return response;
    },
    /**
 * Função equivalente a empty() do PHP. Determina se a variável é vazia.
 *
 * discuss at: http://locutus.io/php/empty/
 * original by: Philippe Baumann
 * input by: Onno Marsman (https://twitter.com/onnomarsman)
 * input by: LH
 * input by: Stoyan Kyosev (http://www.svest.org/)
 * bugfixed by: Kevin van Zonneveld (http://kvz.io)
 * improved by: Onno Marsman (https://twitter.com/onnomarsman)
 * improved by: Francesco
 * improved by: Marc Jansen
 * improved by: Rafał Kukawski (http://blog.kukawski.pl)
 * example 1: empty(null) => returns true
 * example 2: empty(undefined) => returns true
 * example 3: empty([]) => returns true
 * example 4: empty({}) => returns true
 * example 5: empty({'aFunc' : function () { alert('humpty'); } }) => returns false
 *
 * @param {type} mixedVar Variável a ser verificada.
 * @returns {Boolean} Retorna FALSE se var existir e não estiver vazia e não conter um valor
 * zerado. Caso contrário retornará TRUE.
 */
    empty(mixedVar) {
        var undef;
        var key;
        var i;
        var len;
        var emptyValues = [undef, null, false, 0, '', '0'];

        for (i = 0, len = emptyValues.length; i < len; i++) {
            if (mixedVar === emptyValues[i]) {
                return true;
            }
        }

        if (typeof mixedVar === 'object') {
            for (key in mixedVar) {
                if (mixedVar.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }

        return false;
    },
}