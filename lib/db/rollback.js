const { pool } =  require('./pool')
const {_up, down} = require('../../migrate/20230319-create-table-invaders')

const rollback = async() => { 
    console.log("Droping table invaders...")
    await down(pool)
    console.log("...done.")
    return
}

rollback().then(() => process.exit(0)).catch((e) => {
    console.log("ERROR", e)
})
