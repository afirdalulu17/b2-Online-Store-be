const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "OnlineStore",
    password: "lulu17",
    port: 5432,
});

// Connect to PostgreSQL database
client
    .connect()
    .then(() => {
        console.log("Connected to PostgreSQL");
    })
    .catch((err) => {
        console.log("Error Connecting to PostgreSQL", err);
    });

module.exports = client;