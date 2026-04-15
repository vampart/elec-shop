const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

// POST /payments/create-intent
exports.createIntent = async (event) => {
  try {
    const { amount, currency = 'usd' } = JSON.parse(event.body);

    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid amount' }),
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Payment processing failed' }),
    };
  }
};
