const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Pnz1SATqmsNuw1ABe0qtBVwjklT6ZHonWmNMh30C8O3y9tn6YCnCV2MdkXrRRemxcV26lPTXCIxztOoQQ2nEIWh00b7pyJ0vK'); // Replace with your Stripe secret key

module.exports = stripe;
