require('dotenv').config()
const { climateNews } = require("./services/post")
const express = require('express')
var CronJob = require('cron').CronJob
const Instagram = require('instagram-web-api')
const { post } = require('./services/insta')
var FileCookieStore = require("tough-cookie-filestore2")
const cookieStore = new FileCookieStore('./cookies.json')

const password = process.env.IG_PASSWORD
const username = process.env.IG_USERNAME

const app = express()
const client = new Instagram({ username, password, cookieStore }, { language: 'en:us' })

var job = new CronJob('0 0 */6 * * *', async () => {
    console.log("started")
    const postData = await climateNews()
    post(client, postData)
})

job.start()