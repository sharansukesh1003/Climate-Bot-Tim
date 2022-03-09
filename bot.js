require('dotenv').config()
const { climateNews } = require("./services/post")
var CronJob = require('cron').CronJob
const Instagram = require('instagram-web-api')
const { post } = require('./services/instagram')
var FileCookieStore = require("tough-cookie-filestore2")
const cookieStore = new FileCookieStore('./cookies.json')

const password = process.env.IG_PASSWORD
const username = process.env.IG_USERNAME

const client = new Instagram({ username, password, cookieStore }, { language: 'en:us' })

var job = new CronJob('0 0 */23 * * *', async () => {
    console.log("started")
    const postData = await climateNews()
    post(client, postData)
})

console.log('process started')
job.start()
