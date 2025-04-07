/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'purple-button': '#90267A',
        'purple-button-before': '#b52f99',
        'test-back': '#9747FF',
        'footer-back': '#CA3BAC',
        'line': '#E645C4',
        'login-register-label': '#5C5A5A',
        'input-border': '#BBBBBB'
      },
      backgroundImage: {
        'home-page': "url('/Background1.webp')",
        'username-input': "url('/SVG/User-Logo.svg')",
        'password-input': "url('/SVG/Lock.svg')",
        'email-input': "url('/SVG/Email.svg')",
        'phone-input': "url('/SVG/Phone.svg')",
        'pincode-input': "url('/Pin.png')",
        'organization-input': "url('/SVG/Org_icon.svg')",
        'college-ski' : "url(college/background/ski.jpg)"
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      dropShadow: {
        'job_cat': '0 3px 3px rgba(0,0,0,0.5)',
        'job_search': '0 5px 30px rgba(231,203,203,1)',
        'job_filters': '0 3px 2px rgba(0,0,0,0.5)',
        'apply-section': '0 1px 1px rgba(0,0,0,0.25)',
        'profile': '0 1px 1px rgba(0,0,0,0.5)',
        'college': '0 4px 6px rgba(0,0,0,0.25)'
      },
      boxShadow: {
        'purple-buttons': '0px 0px 15px rgba(231, 203, 203, 1)',
      }
    },
  },
  plugins: [],
}

