
const up = (db) => {
    console.log("Creating table 'hints'...")
    return db.query(
        `
        CREATE TABLE hints
        (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255),
            placed_at TIMESTAMP,
            position JSONB,
            user_id INT NOT NULL
        );
        CREATE INDEX hint_user_id_idx ON hints (user_id);
        `
    )
}

const down = (db) => {
    return db.query(
        `
        DROP TABLE hints
        `
    )
}

module.exports = {
    up,
    down
}
