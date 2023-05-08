
const up = (db) => {
    return db.query(
        `
        CREATE TABLE invaders
        (
            space_id INT NOT NULL,
            image VARCHAR(255),
            point INT,
            city_id INT NOT NULL,
            city_name VARCHAR(255),
            name VARCHAR(255),
            date_pos VARCHAR(100),
            date_flash VARCHAR(100),
            position JSONB,
            user_id INT NOT NULL
        );
        CREATE INDEX user_id_idx ON invaders (user_id);
        CREATE UNIQUE INDEX city_id_space_id_user_id_idx ON invaders (city_id, space_id, user_id);
        `
    )
}

const down = (db) => {
    return db.query(
        `
        DROP TABLE invaders;
        `
    )
}

module.exports = {
    up,
    down
}
