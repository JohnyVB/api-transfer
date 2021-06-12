const cashboxModel = require('../models/cashbox.model');;

const createCashboxTest = async () => {

    try {
        const count = await cashboxModel.countDocuments();

        if (count < 1 || !count) {
            const values = await Promise.all([
                new cashboxModel({ 
                    location: 'Localidad de Suba (Test 1)',
                    freight: 6,
                    cash: 200000
                }).save(),
                new cashboxModel({ 
                    location: 'Localidad de Chapinero (Test 2)',
                    freight: 6,
                    cash: 200000
                }).save(),
                new cashboxModel({ 
                    location: 'Localidad de Fontibon (Test 3)',
                    freight: 6,
                    cash: 200000
                }).save()
            ]);

            console.log(values);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createCashboxTest
}