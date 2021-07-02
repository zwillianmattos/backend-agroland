

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

                    let dadosCotacao = {
                        description: titleTab.innerHTML.replace("Cotações | ", "Cotação do "),
                        updated_at: dataAtualizacao,
                        cultures: []
                    };

                    const culturas = document.querySelectorAll(".fl-row-full-width:first-child .table-striped");

                    culturas.forEach((cultura) => {
                        const cotacoes = cultura.querySelectorAll("div > table > tbody > tr");
                        const descricaoCategoria = cultura.querySelector("thead>tr>th>span").innerHTML;

                        console.log(descricaoCategoria)

                        let cultureData = {
                            description: descricaoCategoria,
                            data: []
                        };

                        cotacoes.forEach((cotacao) => {
                            const cidade = cotacao.querySelectorAll("td")[0]
                            const preco = cotacao.querySelectorAll("td")[1]

                            cultureData.data.push({
                                city: cidade.innerHTML,
                                price: parseFloat(preco.innerHTML)
                            })
                        })

                        dadosCotacao.cultures.push(cultureData);
                    })

                    finances.push(dadosCotacao);
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
