import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Always create a default user and navigate to dashboard
    localStorage.setItem(
      "user",
      JSON.stringify({ email: "test@example.com", role: "admin" }),
    );
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}

export default Home;
