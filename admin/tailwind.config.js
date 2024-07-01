/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    important: true,
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                blue: '#33a0ff',
                black: '#262626',
                red: '#FF4747',
                pink: '#FF69B4',
                green: '#00BE98',
                product: '#f6f6f6',
                orange: '#FF952D',
                deal: '#F6F7F8',
            },
            boxShadow: {
                nav: '2px 0 1px 0 rgba(0,0,0,0.1)',
                header: '0 2px 1px 0 rgba(0,0,0,0.1)',
                revenue: '2px 2px 1px 0 rgba(38,38,38,0.1)',
                order: '1px 2px 6px 0 rgba(38,38,38,0.2)',
                product: '2px 2px 2px 0 rgba(38,38,38,0.2)',
                cate: '2px 2px 2px 0 rgba(38,38,38,0.25)',
                cate2: '1px 1px 2px 0 rgba(38,38,38,0.2)',
                product2: '2px 2px 4px 0 rgba(38,38,38,0.25)',
                form: '2px 2px 2px 0 rgba(0,0,0,0.2)',
                product3: '0 4px 4px 0 rgba(0,0,0,0.25)',
                cancel: '1px 1px 2px 0 rgba(255,71,71,0.2)',
                create: '1px 1px 2px 0 rgba(51,160,255,0.2)',
                input: '1px 1px 2px 0 rgba(255,255,255,0.2)',
            },
            fontFamily: {
                poppin: ['Poppins', 'sans-serif'],
                birsmark: ['Bismarck', 'sans-serif'],
                fb: ['Agency FB', 'sans-serif'],
                bak: ['Bakbak One', 'sans-serif'],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
