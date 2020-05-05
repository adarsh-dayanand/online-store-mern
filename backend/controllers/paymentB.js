var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Production,
  //environment: braintree.Environment.Sandbox, 
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        console.log(response);
        
        res.json(response.clientToken);
      });
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
    }, 
      function (err, result) {
          if (err) {
              res.status(500).json(err)
          } else {
              res.json(result)
          }
      }
    );
}