/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            'sans': ['Montserrat', 'sans-serif'],
            'serif': ['Josefin Sans', 'serif'],
        },
        extend: {},
    },
    plugins: [],
}