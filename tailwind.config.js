/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                blush: "#FFC1E3",
                lavender: "#C8A2C8",
                softpink: "#FFB3D1",
                deeppink: "#E91E8C",
                nightblue: "#0D0D2B",
                stargold: "#FFD700",
                rosewhite: "#FFF0F5",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                montserrat: ["Montserrat", "sans-serif"],
                dancing: ["Dancing Script", "cursive"],
            },
            animation: {
                "fade-in": "fadeIn 1.2s ease-in-out forwards",
                "slide-up": "slideUp 0.8s ease-out forwards",
                "glow-pulse": "glowPulse 2s ease-in-out infinite",
                "float": "float 3s ease-in-out infinite",
                "twinkle": "twinkle 2s ease-in-out infinite",
                "bounce-slow": "bounce 3s infinite",
                "spin-slow": "spin 8s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(50px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                glowPulse: {
                    "0%, 100%": { textShadow: "0 0 10px #FFC1E3, 0 0 20px #C8A2C8, 0 0 30px #FFC1E3" },
                    "50%": { textShadow: "0 0 20px #E91E8C, 0 0 40px #C8A2C8, 0 0 60px #FFC1E3" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-15px)" },
                },
                twinkle: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.3" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-gradient": "linear-gradient(135deg, #1a0825 0%, #2d1b4e 40%, #1a0825 100%)",
                "pink-gradient": "linear-gradient(135deg, #ff9ad5 0%, #c8a2c8 50%, #a855f7 100%)",
                "night-gradient": "linear-gradient(180deg, #0D0D2B 0%, #1a0838 50%, #0D0D2B 100%)",
            },
        },
    },
    plugins: [],
};
