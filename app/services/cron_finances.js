

const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { setCache, getCache } = require("./cache");

module.exports = async () => {

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
            uri: 'https://www.canalrural.com.br/cotacao/milho',
            jQuery: false,
            callback: function (error, res, done) {

                if (error) {
                    console.log(error);
                    reject(error)
                } else {

                    const dom = new JSDOM(res.body);
                    const document = dom.window.document;

                    const titleTab = document.querySelector(".title-table");
                    const atualizacao = document.querySelectorAll("div > p > span")[0];
                    const cotacoes = document.querySelectorAll("div > table > tbody > tr");
                    
                    cotacoes.forEach((cotacao) => {
                        const city = cotacao.querySelectorAll("td")[0]
                        const price = cotacao.querySelectorAll("td")[1]

                        finances.push({
                            descricao: titleTab.innerHTML.replace("Cotações | ","Cotação do "),
                            atualizado_em: atualizacao.innerHTML,
                            tipos: {
                                descricao: "",
                                dados: {
                                    cidade: city.innerHTML,
                                    preco: price.innerHTML
                                }
                            }
                        });
                    })
                }

                resole(finances);
                done();
            }
        }]);
    })

    if (setCache("finances", financesData)) {
        console.log(financesData)

        // fs = require('fs');
        // await fs.writeFile('news.json', JSON.stringify(newsData), (err, data) => {

        // });

        return financesData;
    }
    return false;
}
