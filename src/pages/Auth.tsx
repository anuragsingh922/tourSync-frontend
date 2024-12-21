import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { signIn, signUp } from "@/store/slices/userSlice";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("user");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    user,
    status: {
      user: { loading: isloading, error: userError },
    },
  } = useAppSelector((state) => state.user);

  const handleSignIn = () => {
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-up failed", error);
      });
  };

  const handlesignup = () => {
    const userD = { name, email, password, role };
    dispatch(signUp(userD))
      .unwrap()
      .then(() => {
        setIsSignIn(true);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Sign-up failed", error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      handleSignIn();
    } else {
      handlesignup();
    }
  };

  return (
    <div className="container max-w-md mx-auto pt-8">
      <Card>
        <CardHeader>
          <CardTitle>{isSignIn ? "Sign In" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isSignIn
              ? "Welcome back! Sign in to your account"
              : "Create a new account to get started"}
          </CardDescription>
          {role === "organizer" && (
            <CardDescription className=" text-green-600 font-bold">
              Start as an Organizer
            </CardDescription>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isSignIn && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="Name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {isSignIn
                ? !isloading
                  ? "Sign In"
                  : "Signing in..."
                : !isloading
                ? "Sign Up"
                : "Signing Up..."}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Button>
            {role === "user" && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setrole("organizer");
                  setIsSignIn(!isSignIn);
                }}
              >
                Start as an organizer
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
