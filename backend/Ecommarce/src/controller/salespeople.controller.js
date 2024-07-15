const { getSalespeople } = require("../model/salespeople.model");

const listsalespeople = () => {
    console.log("Abcd");

    try {
        const SalesPeople = getSalespeople()
        // console.log(SalesPeople);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    listsalespeople
}