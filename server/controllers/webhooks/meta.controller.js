const metaVerificationService =
  require("../../utilities/webhooks/meta-verification.service.js");

// const metaWebhookService =
//   require("../../utilities/webhooks/meta-webhook.service");

exports.verify = (req, res) => {
  console.log("Request: ", req.query);
  
  const challenge = metaVerificationService.verify(req.query);

  return res.status(200).send(challenge);
};

// exports.receive = async (req, res, next) => {
//   try {
//     await metaWebhookService.receive({
//       headers: req.headers,
//       body: req.body,
//     });

//     return res.sendStatus(200);
//   } catch (error) {
//     next(error);
//   }
// };
