

const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { setCache, getCache } = require("./cache");

module.exports = async ({
    query = 'feijao'
} = {}) => {

    const financesData = await new Promise((resole, reject) => {

        console.log("[Loading data from]: Cron")
        const c = new Crawler({
            maxConnections: 10,
            includeNodeLocations: true,
            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                    reject(error)
                } else {
                    var $ = res.$;
                    console.log($("title").text());
                }
                done();
            }
        });

        let finances = [];

        c.queue([{
            uri: `https://www.canalrural.com.br/cotacao/${query}`,
            jQuery: false,
            callback: function (error, res, done) {

                if (error) {
                    console.log(error);
                    reject(error)
                } else {

                    const dom = new JSDOM(res.body);
                    const document = dom.window.document;

                    const titleTab = document.querySelector(".title-table");
                    const atualizacao = document.querySelector("div > p > span b").innerHTML.trim();

                    let dataAtualizacao = null;

                    if (typeof atualizacao != "undefined" && atualizacao != null) {
                        dataAtualizacao = new Date(Date.parse(atualizacao)).toISOString()
                    }

                    let data = {
                        descricao: titleTab.innerHTML.replace("Cotações | ", "Cotação do "),
                        atualizado_em: dataAtualizacao,
                        tipos: []
                    };

                    const categorias = document.querySelectorAll(".fl-row-full-width:first-child .table-striped");

                    categorias.forEach((category) => {
                        const cotacoes = category.querySelectorAll("div > table > tbody > tr");
                        const descricaoCategoria = category.querySelector("thead>tr>th>span").innerHTML;

                        console.log(descricaoCategoria)

                        let tipo = {
                            descricao: descricaoCategoria,
                            dados: []
                        };

                        cotacoes.forEach((cotacao) => {
                            const city = cotacao.querySelectorAll("td")[0]
                            const price = cotacao.querySelectorAll("td")[1]

                            tipo.dados.push({
                                cidade: city.innerHTML,
                                preco: parseFloat(price.innerHTML)
                            })
                        })

                        data.tipos.push(tipo);
                    })

                    finances.push(data);
                }
                resole(finances);
                done();
            }
        }]);
    })

    if (setCache(`finances_${query}`, financesData)) {
        return financesData;
    }

    return false;
}
