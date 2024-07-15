const  pool  = require("../db/mysql");


const getSalespeople = async () => {
    try {
        const data = await pool.execute('SELECT * FROM salespeople')
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getSalespeople
}