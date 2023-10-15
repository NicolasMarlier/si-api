
const up = (db) => {
    return db.query(
        `
        ALTER TABLE invaders
            ADD hosted_image_url VARCHAR(255),
            ADD hosted_image_300_url VARCHAR(255),
            ADD hosted_image_30_url VARCHAR(255);
        `
    )
}

const down = (db) => {
    return db.query(
        `
        ALTER TABLE invaders
            DROP hosted_image_url,
            DROP hosted_image_300_url,
            DROP hosted_image_30_url;
        `
    )
}

module.exports = {
    up,
    down
}
