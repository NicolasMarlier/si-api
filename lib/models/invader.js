const _ = require('lodash')
const cdn = require('../cdn')
const { toRow } = require('./helpers')
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

const process_all_images = async(db, user_id) => {
    const { rows } = await db.query("SELECT * FROM invaders WHERE user_id = $1 AND hosted_image_url IS NULL", [user_id]) 
    console.log(`${invaders.length} to process`)
    await Promise.all(
        rows.map(invader => {
            process_images(db, user_id, invader.space_id, invader.city_id)
        })
    )
}
const process_images = async(db, user_id, space_id, city_id) => {
    const { rows: [space] } = await db.query("SELECT * FROM invaders WHERE user_id = $1 AND space_id = $2 AND city_id = $3", [user_id, space_id, city_id])
    const original_image_url = space.image
    const hosted_image_url = await cdn.upload(original_image_url)
    const hosted_image_300_url = await cdn.upload(original_image_url, 300)
    const hosted_image_30_url = await cdn.upload(original_image_url, 30)
    await db.query(
        "UPDATE invaders SET hosted_image_url = $4, hosted_image_300_url = $5, hosted_image_30_url = $6 WHERE user_id = $1 AND space_id = $2 AND city_id = $3",
        [user_id, space_id, city_id, hosted_image_url, hosted_image_300_url, hosted_image_30_url]
    )
}

const save = async(db, user_id, invaders) => {
    query = `
    INSERT INTO invaders
    (${Object.keys(FIELDS).join(',')})
    VALUES
    ${_.map(invaders, invader => `(${toRow(invader, user_id, FIELDS)})`).join(",\n")}
    ON CONFLICT (name, user_id) DO UPDATE
    SET position = EXCLUDED.position
    `
    console.log(query)
    return db.query(query)
}
module.exports = {
    list,
    save,
    process_images,
    process_all_images
}

