const { pool } = require('../lib/db/pool')
const Invader = require('../lib/models/invader')
// const cdn = require('../lib/cdn')

const main = async() => {
    // const url = "https://space-invaders.com/media/invaders/paris/PA_13-9RWHTJKN.jpg"
    // const url = "https://space-invaders.com/media/invaders/paris/PA_32-LQIZW3TT.jpg"
    // const invaders = await Invader.list(pool, user_id)
    // console.log(invaders[0])
    const user_id = 1

    invaders = await Invader.list(pool, user_id)
    console.log(`${invaders.length} invaders found`)

    await Invader.process_images(pool, user_id, 66, 1)

    // const newUrl = await cdn.upload(url, 30)
    // console.log("New url:", newUrl)
}
main()

