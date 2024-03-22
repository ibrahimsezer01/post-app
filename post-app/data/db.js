const config = require("../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "mysql",
    host: config.db.host,
    define: {
        timestamps: false
    }
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connected mysql db");
    }
    catch(err) {
        console.log("Error: Not connected to mysql db", err);
    }
}

connect();

// (async () => {
//     await sequelize.sync({ force: true });
// })();


module.exports = sequelize;