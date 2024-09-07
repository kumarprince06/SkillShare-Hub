const crypto = require('crypto');
const EnrollCourseModel = require('../../model/EnrollCourseModel');

const PaymentController = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  // console.log("Webhook Called..!");

  // Create HMAC SHA256 hash and compare it with the signature
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    // Handle the webhook event
    const event = req.body.event;
    console.log("Event: ", event);
    const payload = req.body.payload;
    console.log("Payload data: ", payload);

    if (event === 'payment.captured') {
      // Handle payment captured event
      console.log('Payment captured:', payload.payment.entity);

      const payment = payload.payment.entity;
      const courseId = payment.notes.courseId; 
      const userId = payment.notes.userId;

      try {
        // Save the payment and enrollment details to the database
        const enrollment = new EnrollCourseModel({
          courseId: courseId,
          userId: userId,
          paymentId: payment.id,
          amount: payment.amount / 100, 
          currency: payment.currency,
          status: 'completed',
        });

        const data =  await enrollment.save();
        console.log("Course Data: ", data)
        // console.log('Enrollment record saved:', enrollment);
        res.status(200).json({ status: 'ok' });
      } catch (error) {
        console.error('Error saving enrollment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      // Handle other events if needed
      res.status(200).json({ status: 'event received' });
    }
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
};

module.exports = PaymentController;
