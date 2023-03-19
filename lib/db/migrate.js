const { pool } =  require('./pool')
const {up, _down} = require('../../migrate/20230319-create-table-invaders')

const migrate = async() => { 
    console.log("Creating table invaders...")
    await up(pool)
    console.log("...done.")
    return
}

migrate().then(() => process.exit(0)).catch((e) => {
    console.log("ERROR", e)
    process.exit(1)
})
