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
            postCaption: news.articles[0].description + `\n ${news.articles[0].url}`,
            postImage: 'post_image/resize.jpeg'
        }
    }
}

async function downloadImage(image) {
    const options = {
        url: image,
        dest: 'post_image/post.jpg'
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
    sharp('post_image/post.jpg').resize(600, 600).toFile('post_image/resize.jpeg')
}