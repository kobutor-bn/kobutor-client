import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SXP9NIXICorLF8nU9rPcTnxixPofox8XY8J1JjmmjZGJgicY6ZuPwMEt8Ztdd59ZVnuFvkIUphbDmPYdCAgt9XL000gOvjaRz'
);