const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                tiktok: ['TikTokFont', ...defaultTheme.fontFamily.sans],
                tiktokDisplay: ['TikTokDisplayFont', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                light: {
                    text: '#161823',
                    bg: '#ffffff',
                    bgPopper: '#ffffff',
                    bgModal: '#ffffff',
                },
                dark: {
                    text: '#ffffff',
                    bg: '#121212',
                    bgPopper: '#2a2a2a',
                    bgModal: '#1e1e1e',
                },
                colorTooltip: '#434343',
                // bgColor: 'rgba(var(--bg-color))',
                // textColor: 'rgba(var(--text-color))',
                primary: '#fe2c55',
                primaryhover: '#ea284e',
                color: '#161823',
            },
            keyframes: {
                spinCustom: {
                    '0%': { transform: 'rotate(0deg)' }, // Thêm "deg" để CSS hợp lệ
                    '100%': { transform: 'rotate(360deg)' },
                },
                shine: {
                    '100%': { left: '125%' },
                },
                burgerHover: {
                    '0%': { width: '100%' },
                    '50%': { width: '50%' },
                    '100%': { width: '100%' },
                },
                introXAnimation: {
                    to: {
                        opacity: '1',
                        transform: 'translateX(0px)',
                    },
                },
            },
            animation: {
                spinCustom: 'spinCustom 1s infinite normal none running',
                shine: 'shine 0.8s',
                'intro-x-animation': 'introXAnimation .4s ease-in-out forwards .33333s',
                'burger-hover-2': 'burgerHover 1s infinite ease-in-out alternate forwards 200ms',
                'burger-hover-4': 'burgerHover 1s infinite ease-in-out alternate forwards 400ms',
                'burger-hover-6': 'burgerHover 1s infinite ease-in-out alternate forwards 600ms',
            },
        },
    },
    variants: {
        extend: {
            textColor: ['red', 'blue', 'dark'],
            backgroundColor: ['red', 'blue'],
            // Thêm các thuộc tính khác nếu bạn muốn hỗ trợ chúng cho các tiền tố như red:, blue:
        },
    },
    // // Thêm class dark
    // darkMode: 'class',
    // // Theo mode của thiết bị
    // darkMode: 'media',
    // Sử dụng data-theme="dark" để kích hoạt dark mode
    darkMode: ['selector', '[data-theme="dark"]'], // Sử dụng data-theme="dark" để kích hoạt chế độ tối
    plugins: [],
};
