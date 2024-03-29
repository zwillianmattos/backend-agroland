

const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { setCache, getCache } = require("./cache");

const { slugify } = require("../utils/utils");

module.exports = async () => {
    if (process.env.enable_crawler == "N")
        return [];
    
    return [];
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
                        let img = "";
                        if(imgData != "" && imgData != undefined && imgData !== null) {
                            console.log(imgData);
                            img = imgData.getAttribute('data-srcset') || imgData.getAttribute('srcset')
                            if (typeof img != "undefined" && img != null) {
                                img = img.split(",")
                                img = img[0].split(" ")[0]
                            }
                        } else {
                            if(imgData != "" && imgData != undefined && imgData !== null) {
                                if( imgData.getAttribute("src") !== null ) {
                                    img = imgData.getAttribute("src")
                                }
                            }
                        }
                        
                        
                        const dataHtml = post.querySelector(".data-hora").innerHTML.trim()
                        let dataFormatada = null;

                        if (typeof dataHtml != "undefined" && dataHtml != null) {
                            const dx = dataHtml.split(" às ")
                            const data = dx[0].split("/")
                            const hora = dx[1].split("h")
                            dataFormatada = new Date(`${data[2]}-${data[1]}-${data[0]} ${hora[0]}:${hora[1]}:00`)
                        }

                        // convert innerHTML to string
                        let id = slugify(title.innerHTML).split(" ").join("-")
                        
                        news.push({
                            title: title.innerHTML,
                            author: "",
                            source: {
                                "id": id,
                                "name": title.innerHTML
                            },
                            url: title.getAttribute('href'),
                            categoria: categoria.innerHTML,
                            description: descricao != null ? descricao.innerHTML : "",
                            urlToImage: img != null ? img : "",
                            publishedAt: dataFormatada != null ? dataFormatada : "",
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
        return newsData;
    }
    return false;
}
