import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

/*
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-01", // pick latest
});*/
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a PaymentIntent
app.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        console.log("Request body:", req.body); // 👀 check incoming data

        if (!amount || !currency) {
            return res.status(400).json({ error: "Amount and currency required" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        });

        console.log("PaymentIntent created:", paymentIntent.id);

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Stripe error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(4242, () => console.log("Server running on http://localhost:4242"));
