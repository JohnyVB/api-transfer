const { response, request } = require('express');

const transactionModel = require('../models/transaction.model');


const transactionGet = async (req = request, res = response) => {

    try {
        const { transactionId } = req.query;

        const transaction = await transactionModel.findById(transactionId)
                                    .populate('to')
                                    .populate('from');

        res.status(200).send({
            transaction
        });

    } catch (error) {
        return res.status(500).send({
            msg: 'Error en transactionGet()',
            error
        });
    }
}

const transactionPost = async (req = request, res = response) => {

    try {
        const {...transactionAll } = req.query;
        const transaction = new transactionModel(transactionAll);

        await transaction.save();

        res.status(200).send({
            transaction
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en transactionPost()',
            error
        });
    }
}

const transactionIn = async (req = request, res = response) => {

    try {
        const { transactionId, deliveredIn } = req.query;

        const transaction = transactionModel.findOneAndUpdate({ _id: transactionId, delivered: false}, { delivered: true, deliveredIn });

        res.status(200).send({
            transaction
        });
    } catch (error) {
        return res.status(500).send({
            msg: 'Error en transactionIn()',
            error
        });
    }
}

module.exports = {
    transactionGet,
    transactionPost,
    transactionIn
}