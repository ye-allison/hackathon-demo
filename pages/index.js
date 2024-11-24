import Layout from "../components/Layout";
import { useEffect } from "react";

export default function Home() {
  const redirectToNextPage = () => {
    window.location.href = "/step1"; // Redirect to Step 1
  };

  const onHandleEnter = (event) => {
    if (event.key === "Enter") {
      redirectToNextPage(); // Navigate to Step 1 when Enter is pressed
    }
  };

  useEffect(() => {
    // Add event listener for the Enter key
    document.addEventListener("keydown", onHandleEnter);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", onHandleEnter);
    };
  }, []); // Empty dependency array ensures it runs only once

  return (
    <Layout>
      <div className="container-front">
        <div className="logo">
          <img src="/images/logo.jpeg" alt="Logo" />
        </div>
        <h4 className="h4-home">January 1 - 3, 2025 | Online Event</h4>
        <h1 className="title">ONOVA HACKS</h1>
        <p className="opening">Beginner Friendly Hackathon - Explore New Ideas</p>
        <p className="deadline">Application deadline: December 15, 2024</p>
        <div className="button-home">
          <button id="signUpButton" onClick={redirectToNextPage}>
            Sign Up!
          </button>
        </div>
        <p className="hint-home">press Enter ↵</p>
      </div>
    </Layout>
  );
}
