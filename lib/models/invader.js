const _ = require('lodash')
const INT_TYPE = 'int'
const STRING_TYPE = 'string'
const JSONB_TYPE = 'jsonb'
const FIELDS = {
    "space_id": INT_TYPE,
    "image": STRING_TYPE,
    "point": INT_TYPE,
    "city_id": INT_TYPE,
    "city_name": STRING_TYPE,
    "name": STRING_TYPE,
    "date_pos": STRING_TYPE,
    "date_flash": STRING_TYPE,
    "position": JSONB_TYPE,
    "user_id": INT_TYPE
}

const list = async(db, user_id) => {
    const { rows } = await db.query("SELECT * FROM invaders WHERE user_id = $1", [user_id])
    return rows
}

const toRow = (invader, user_id) => {
    return _.map(FIELDS, (type, field) => {
        if(field === "user_id") {
            return user_id
        }
        else if(type === JSONB_TYPE) {
            if(invader[field]) {
                return `'${JSON.stringify(invader[field])}'`
            }
            else {
                return "NULL"
            }
            
        }
        else if(type === STRING_TYPE) {
            return `'${invader[field]}'`
        }
        else if(type === INT_TYPE) {
            return invader[field]
        }
        else {
            throw `Unsupported field type: ${field}`
        }
    }).join(',')
}

const save = async(db, user_id, invaders) => {
    query = `
    INSERT INTO invaders
    (${Object.keys(FIELDS).join(',')})
    VALUES
    ${_.map(invaders, invader => `(${toRow(invader, user_id)})`).join(",\n")}
    ON CONFLICT (space_id, user_id) DO UPDATE
    SET position = EXCLUDED.position
    `
    console.log(query)
    return db.query(query)
}
module.exports = {
    list,
    save
}

