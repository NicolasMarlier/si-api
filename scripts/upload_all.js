const { pool } = require('../lib/db/pool')
const Invader = require('../lib/models/invader')
// const cdn = require('../lib/cdn')

const main = async() => {
    const user_id = 1

    invaders = await Invader.list(pool, user_id)
    console.log(`${invaders.length} invaders found`)

    await Invader.process_all(pool, user_id)

    // const newUrl = await cdn.upload(url, 30)
    // console.log("New url:", newUrl)
}
main()

