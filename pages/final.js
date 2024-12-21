import Layout from "../components/Layout";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


export default function Final() {

  const { userData } = useContext(UserContext);
  console.log("User Data:", userData); // Check if the context data is available
  

  return (
    <Layout>
      <div className="progress-container">
        <div className="progress-bar-final" style={{ width: "100%" }}></div>
      </div>
      <div className="scaled-container">
        <div className="container-final">
          <h1 className="h1-title">Congrats {userData.name}!</h1>
          <p className="middle">From {userData.university}</p>
          <p>You have signed up for <strong>Beginner Hacks</strong>!</p>
          <div className="button-container">
            <button onClick={() => (window.location.href = "/")}>
              Go Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
