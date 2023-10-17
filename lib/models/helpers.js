const _ = require('lodash')
const TYPE_INT = 'int'
const TYPE_STRING = 'string'
const TYPE_JSONB = 'jsonb'
const TYPE_SERIAL_PRIMARY_KEY = 'serial_primary_key'

const toRow = (record, user_id, fields) => {
    return _.map(
            _.pickBy(fields, (v, _k) => v !== TYPE_SERIAL_PRIMARY_KEY)
        , (type, field) => {
        if(field === "user_id") {
            return user_id
        }
        else if(type === TYPE_JSONB) {
            if(record[field]) {
                return `'${JSON.stringify(record[field])}'`
            }
            else {
                return "NULL"
            }
            
        }
        else if(type === TYPE_STRING) {
            return `'${record[field]}'`
        }
        else if(type === TYPE_INT) {
            return record[field]
        }
        else {
            throw `Unsupported field type: ${field}`
        }
    }).join(',')
}

module.exports = {
    toRow,
    TYPE_INT,
    TYPE_JSONB,
    TYPE_STRING,
    TYPE_SERIAL_PRIMARY_KEY
}