const { pool } =  require('./pool')
// const {up1, _down} = require('../../migrate/20230319-create-table-invaders')
const {up, down} = require('../../migrate/20231015-create-hints')

const migrate = async() => { 
    await down(pool)
    await up(pool)
    console.log("...done.")
    return
}

migrate().then(() => process.exit(0)).catch((e) => {
    console.log("ERROR", e)
    process.exit(1)
})
