const _ = require('lodash')
const { toRow, TYPE_INT, TYPE_JSONB, TYPE_STRING, TYPE_SERIAL_PRIMARY_KEY } = require('./helpers')

const FIELDS = {
    "id": TYPE_SERIAL_PRIMARY_KEY,
    "description": TYPE_STRING,
    "position": TYPE_JSONB,
    "user_id": TYPE_INT
}

const list = async(db, user_id) => {
    const { rows } = await db.query("SELECT * FROM hints WHERE user_id = $1", [user_id])
    return rows
}

const destroy = async(db, user_id, hint_id) => {
    query = `
    DELETE FROM hints
    WHERE id = ${hint_id} AND user_id = ${user_id}
    `
    console.log(query)
    return db.query(query)
}

const save = async(db, user_id, hint) => {
    query = `
    INSERT INTO hints
    (${Object.keys(_.pickBy(FIELDS, (v, _k) => v != TYPE_SERIAL_PRIMARY_KEY)).join(',')})
    VALUES
    (${toRow(hint, user_id, FIELDS)})
    `
    console.log(query)
    return db.query(query)
}
module.exports = {
    list,
    destroy,
    save
}

