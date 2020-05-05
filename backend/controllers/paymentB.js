var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Production,
  //environment: braintree.Environment.Sandbox,
  merchantId: "pdvg4qk3znzdppvc",
  publicKey: "3wnsmps9drthzc5d",
  privateKey: "2ef5858636b3f05eb420cd0843a653b3"
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