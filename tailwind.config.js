/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7b3ce7",                
        active: "rgba(123, 60, 231, 0.2)",              
        text: "#1f2937",                  
        'text-light': "#4b5563",           
        'text-inverse': "#ffffff",         
        background: "#F3F4F6",           
        card: "#FFFFFF",                    
        border: "#E5E7EB",                 
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },  
  plugins: [],
}
