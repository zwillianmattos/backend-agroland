

const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { setCache, getCache } = require("./cache");

module.exports = async () => {

    const newsData = await new Promise((resole, reject) => {

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

        let news = [];

        c.queue([{
            uri: 'https://www.canalrural.com.br/noticias/',
            jQuery: false,
            callback: function (error, res, done) {

                if (error) {
                    console.log(error);
                    reject(error)
                } else {

                    const dom = new JSDOM(res.body);
                    const document = dom.window.document;

                    const posts = document.querySelectorAll(".fl-post-column");

                    posts.forEach((post) => {
                        const title = post.querySelector(".fl-post-title > a")
                        const categoria = post.querySelector("h3")
                        const descricao = post.querySelector(".fl-post-excerpt > p")
                        const imgData = post.querySelector(".fl-post-image img")
                        const img = imgData.getAttribute('data-srcset').split(",");

                        const dataHtml = post.querySelector(".data-hora").innerHTML.trim()
                        const dx = dataHtml.split(" às ")
                        const data = dx[0]
                        const hora = dx[1].split("h")
                        const dataHora = new Date(`${data} ${hora[0]}:${hora[1]}:00`)

                        news.push({
                            title: title.innerHTML,
                            author: "",
                            source: {
                                "id": title.innerHTML.toLowerCase().replace(" ", "-").trim(),
                                "name": title.innerHTML
                            },
                            url: title.getAttribute('href'),
                            categoria: categoria.innerHTML,
                            description: descricao != null ? descricao.innerHTML : "",
                            urlToImage: img[0].split(" ")[0],
                            publishedAt: dataHora,
                            content: descricao != null ? descricao.innerHTML : "",
                        });
                    })
                }

                resole(news);
                done();
            }
        }]);
    })

    if (setCache("news", newsData)) {
        console.log(newsData)

        // fs = require('fs');
        // await fs.writeFile('news.json', JSON.stringify(newsData), (err, data) => {

        // });

        return newsData;
    }
    return false;
}
