import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, use simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Allow any user to log in for testing purposes
    // Store some user info in localStorage for demo purposes
    localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
    navigate("/dashboard");
  };

  return (
    <Card className="p-6 w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>

        <div className="text-center text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Register a new user
          </Link>
        </div>
      </form>
    </Card>
  );
}
