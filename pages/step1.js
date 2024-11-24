import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

export default function Step1() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();

  const updateProgressBar = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, name: value });
    console.log("Updated Name:", value);
    setProgress(value.trim() ? 33 : 0);
  };

  const validateAndProceed = () => {
    if (userData.name.trim() === "") {
      setError(true);
    } else {
      setError(false);
      const container = document.querySelector(".container");
      container.classList.add("swipe-up-fade-out");
      setTimeout(() => {
        router.push("/step2"); // Navigate to the next page// Navigate to Step 2
      }, 800); // Match animation duration
    }
  };

  // Handle "Enter" key functionality
  const onHandleEnter = (event) => {
    if (event.key === "Enter") {
      validateAndProceed(); // Call validateAndProceed when Enter is pressed
    }
  };

  // Add event listener for Enter key
  useEffect(() => {
    document.addEventListener("keydown", onHandleEnter);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", onHandleEnter);
    };
  }, [userData.name]); // Dependency array to re-run effect when `name` changes

  useEffect(() => {
    if (performance.navigation.type === 1) { // Check if the page was refreshed
      router.replace("/");
    }
  }, [router]);

  return (
    <Layout>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="container swipe-up">
        <div className="step">
          <span>1 →</span> Your Full Name<span className="required">*</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="nameInput"
            placeholder="Type your answer here..."
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
            Please enter your name to continue.
          </p>
        )}
      </div>
    </Layout>
  );
}
