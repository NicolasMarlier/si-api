const _ = require('lodash')
const { toRow } = require('./helpers')

const INT_TYPE = 'int'
const STRING_TYPE = 'string'
const JSONB_TYPE = 'jsonb'
const FIELDS = {
    "id": INT_TYPE,
    "description": STRING_TYPE,
    "position": JSONB_TYPE,
    "user_id": INT_TYPE
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

const save = async(db, user_id, hints) => {
    query = `
    INSERT INTO hints
    (${Object.keys(FIELDS).join(',')})
    VALUES
    ${_.map(hints, hint => `(${toRow(hint, user_id, FIELDS)})`).join(",\n")}
    `
    console.log(query)
    return db.query(query)
}
module.exports = {
    list,
    destroy,
    save
}

