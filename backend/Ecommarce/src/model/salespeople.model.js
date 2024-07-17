const pool = require("../db/mysql");


const getSalespeople = async () => {
    try {
        const [result, feild] = await pool.execute('SELECT * FROM salespeople')
        console.log(result);

        return result

    } catch (error) {
        console.log(error);
        throw new Error("error fetched salespeople");
    }
}

const addSalespeople = async (sname, city, comm) => {
    try {
        const [result] = await pool.execute('INSERT INTO salespeople (sname, city, comm) VALUES (?, ?, ?)', [sname, city, comm])
        console.log(result);

        return ({ snum: result.insertId, sname, city, comm })
    } catch (error) {
        console.log(error);
        throw new Error("error add salespeople");
    }
}


const deleteSalespeople = async (snum) => {
    try {
        const [result] = await pool.execute('DELETE FROM salespeople WHERE snum = ?', [snum])
        console.log(result);

        return result

    } catch (error) {
        console.log(error);
        throw new Error("error delete salespeople");
    }
}

const updateSalespeople = async (snum, sname, city, comm) => {
    try {
        const [result] = await pool.execute('UPDATE salespeople SET sname=?, city= ?, comm= ?  WHERE snum = ?', [sname, city, comm, snum])
        console.log(result);

        return result

    } catch (error) {
        console.log(error);
        throw new Error("error update salespeople");
    }
}




module.exports = {
    getSalespeople,
    addSalespeople,
    deleteSalespeople,
    updateSalespeople
}