import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function Step3() {
  const [progress, setProgress] = useState(67);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const updateProgressBar = (e) => {
    const value = e.target.value;
    setEmail(value);
    setProgress(value.trim() ? 100 : 67); // Update progress bar based on input
  };

  const validateAndProceed = () => {
    if (email.trim() === "") {
      setError("Please enter your email address."); // Error: Empty email
      return false; // Prevent proceeding
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address."); // Error: Invalid email
      return false; // Prevent proceeding
    } else {
      setError(""); // Clear error if valid
      const container = document.querySelector(".container");
      container.classList.add("swipe-up-fade-out");
      setTimeout(() => {
        router.push("/final"); // Navigate to final page
      }, 800); // Match animation duration
      return true; // Allow proceeding
    }
  };

  // Handle "Enter" key functionality
  const onHandleEnter = (event) => {
    if (event.key === "Enter") {
      const proceed = validateAndProceed(); // Call validateAndProceed when Enter is pressed
      if (proceed) {
        // Optional: Additional handling if navigation happens
        console.log("Navigating to /final");
      }
    }
  };

  // Add event listener for Enter key
  useEffect(() => {
    document.addEventListener("keydown", onHandleEnter);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", onHandleEnter);
    };
  }, [email]); // Re-run effect when `email` changes

  useEffect(() => {
    if (performance.navigation.type === 1) { // Check if the page was refreshed
      router.replace("/");
    }
  }, [router]);

  return (
    <Layout>
      <div className="progress-container">
        <div className="progress-bar3" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="container swipe-up">
        <div className="step">
          <span>3 →</span> Your Email Address<span className="required">*</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="emailInput"
            placeholder="Type your answer here..."
            value={email} // Controlled component
            onChange={updateProgressBar}
          />
        </div>
        <div className="button-container">
          <button id="signUpButton" onClick={validateAndProceed}>
            OK
          </button>
        </div>
        <p className="hint">press Enter ↵</p>
        {error && (
          <p id="errorMessage" className="error">
            {error}
          </p>
        )}
      </div>
    </Layout>
  );
}
