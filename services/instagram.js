var fs = require('fs')

module.exports = {
    post: async function (client, post) {
        console.log("Logging in...")
        await client.login()
            .then(async () => {
                console.log("Login Successfull")
                client.uploadPhoto({
                    photo: post.postImage,
                    caption: post.postCaption
                }).then(async (res) => {
                    const media = res.media
                    await client.addComment({
                        mediaId: media.id,
                        text: "#Greenpeace #climatejustice #climateaction #ClimateChange #NextGeneration #rebelforlife #ClimateEmergency #ClimateJustice #ClimateCrisis #FossilFree #bethechange #ActNow #ForTheEarth #gretathunberg #KeepItInTheGround #SaveOurPlanet #NoPlanetB #SaveThePlanet #Sustainability #fighteverycrisis #ClimateStrike #SchoolStrike4Climate #StudentActivism #ClimateAction #Youth #SchoolStrikeForClimate #FridaysForFuture #fightforafuture #extinctionrebellion"
                    })
                    let postPath = 'post_image/post.jpg'
                    let postResizedPath = 'post_image/resize.jpeg'
                    fs.unlinkSync(postPath)
                    fs.unlinkSync(postResizedPath)
                    console.log('successfully posted')

                }).catch((err) => {
                    console.log(`upload error : ${err}`)
                })
            })
            .catch((err) => {
                console.log("Login Failed")
                console.log(err)
            })
    }
}