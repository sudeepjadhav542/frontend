import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1c1c1c, #3a1c71)",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        zIndex: 9999, // Ensures it appears above other elements
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#ff4f4f",
          textShadow: "0 0 10px #ff4f4f, 0 0 20px #ff4f4f",
        }}
      >
        🚧 404 - Oops! 🚧
      </h1>
      <p style={{ fontSize: "1.5rem", maxWidth: "600px", opacity: "0.9" }}>
        Uh-oh! You seem lost... even Pikachu is confused! 😲
      </p>
      <img
        src="/404.png"
        alt="Confused Pikachu"
        style={{
          width: "300px",
          margin: "20px 0",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          animation: "float 3s ease-in-out infinite",
        }}
      />
      <p style={{ fontSize: "1.2rem", opacity: "0.8" }}>
        No worries, let's get you back home! 🏡
      </p>
      <Link
        to="/"
        style={{
          padding: "14px 28px",
          fontSize: "1.2rem",
          background: "linear-gradient(45deg, #ff4f4f, #ff9900)",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0px 4px 15px rgba(255, 79, 79, 0.5)",
          transition: "0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        🏠 Take Me Home
      </Link>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
