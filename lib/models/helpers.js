const toRow = (record, user_id, fields) => {
    return _.map(fields, (type, field) => {
        if(field === "user_id") {
            return user_id
        }
        else if(type === JSONB_TYPE) {
            if(record[field]) {
                return `'${JSON.stringify(record[field])}'`
            }
            else {
                return "NULL"
            }
            
        }
        else if(type === STRING_TYPE) {
            return `'${record[field]}'`
        }
        else if(type === INT_TYPE) {
            return record[field]
        }
        else {
            throw `Unsupported field type: ${field}`
        }
    }).join(',')
}

module.exports = {
    toRow
}