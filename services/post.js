require('dotenv').config({ path: '../.env' })
const download = require('image-downloader')
const NewsAPI = require('newsapi')
const sharp = require('sharp')
const apiKey = process.env.API_KEY
const newsapi = new NewsAPI(apiKey)

module.exports = {
    climateNews: async function () {
        const news = await newsapi.v2.topHeadlines({
            q: 'climate'
        })
        const image = news.articles[0].urlToImage
        await downloadImage(image)
        await resizeImage()
        return {
            postCaption: news.articles[0].description +'\n Read the full article at' + `\n ${news.articles[0].url}`,
            postImage: 'public/resize.jpeg'
        }
    }
}

async function downloadImage(image) {
    const options = {
        url: image,
        dest: 'public/post.jpg'
    }
    await download.image(options)
        .then(() => {
            console.log('success download')
        })
        .catch((err) => {
            console.log('download error')
            console.log(err)
        })
}

async function resizeImage() {
    sharp('public/post.jpg').resize(600, 600).toFile('public/resize.jpeg')
}