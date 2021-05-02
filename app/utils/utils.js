module.exports = {
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