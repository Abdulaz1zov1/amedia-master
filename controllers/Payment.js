const _ = require('lodash')
const request = require('request');
const { initializePayment } = require('../payment/Click')(request);

exports.createClickRequest = (req,res) => {
    const form = _.pick(
        req.body,
        [
            'service_id',
            'amount',
            'phone_number',
            'merchant_trans_id',
            'full_name'
        ]);
    form.metadata = {
        full_name: form.full_name
    }
    form.amount *= 100;

    initializePayment(form, (error, body) => {
        if (error) {
            //handle errors
            console.log(error);
            return res.send(error);
        }
        let response = JSON.parse(body);
        console.log(response);
        res.send(response)
    });
}