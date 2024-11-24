import Layout from "../components/Layout";
import { useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";

export default function Step2() {
  const [progress, setProgress] = useState(33);
  const [university, setUniversity] = useState("");
  const [error, setError] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();


  const updateProgressBar = (e) => {
    const value = e.target.value;
    setUniversity(value);
    setUserData({ ...userData, university: value });
    console.log("Updated University:", value);
    
    setProgress(value.trim() ? 67 : 33);
  };

  const validateAndProceed = () => {
    if (university.trim() === "") {
      setError(true);
    } else {
      setError(false);
      const container = document.querySelector(".container");
      container.classList.add("swipe-up-fade-out");
      setTimeout(() => {
        router.push("/step3"); // Navigate to the next page// Navigate to Step 2
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
  }, [university]); // Dependency array to re-run effect when `name` changes

  useEffect(() => {
    if (performance.navigation.type === 1) { // Check if the page was refreshed
      router.replace("/");
    }
  }, [router]);

  return (
    <Layout>
      <div className="progress-container">
        <div className="progress-bar2" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="container swipe-up">
        <div className="step">
          <span>2 →</span> Your University<span className="required">*</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="universityInput"
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
            Please enter your university to continue.
          </p>
        )}
      </div>
    </Layout>
  );
}
