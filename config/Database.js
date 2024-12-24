// import { Sequelize } from "sequelize";

// const db = new Sequelize("dchatbotpm_db_chatbot_umuslim", "root", "", {
//     host: "chatbot-pmb.my.id",
//     user:'chatbotpm_anang',
//     password: 'FT3amJGkKN46g@5',
//     dialect: "mysql",
// });


// export default db

import { Sequelize } from "sequelize";

const db = new Sequelize("db_chatbot_umuslim", "root", "", {
    host: "localhost",
    dialect: "mysql",
});


export default db


