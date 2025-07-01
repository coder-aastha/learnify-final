// ZlTtfVlKLEAZ42AH

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, {data:registerData, error:registerError, isLoading:registerIsLoading, isSuccess:registerIsSuccess}] = useRegisterUserMutation()
  const [loginUser, {data:loginData, error:loginError, isLoading:loginIsLoading, isSuccess:loginIsSuccess}] = useLoginUserMutation()

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData)
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Created Account Successfully.")
    }
    if(registerError){
      toast.error(registerError.data.message || "Sign Up Failed")
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Logged In Successfully.")
      navigate("/")
    }
    if(loginError){
      toast.error(loginError.data.message || "Login Failed")
    }
  }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError])

  return (
    <div className="flex justify-center w-full mt-20">
      <div className="flex max-w-sm flex-col gap-6 w-full">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you&apos;re done;
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    required="true"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    required="true"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="password"
                    value={signupInput.password}
                    required="true"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                  {
                    registerIsLoading ? (
                      <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                      </>
                    ) : "Sign Up"
                  }
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login to your account. After signup, you&apos;ll be logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Email</Label>
                  <Input
                    type="email"
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="email"
                    value={loginInput.email}
                    required="true"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="password"
                    value={loginInput.password}
                    required="true"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disable={loginIsLoading} onClick={() => handleRegistration("login")}>
                  {
                    loginIsLoading ? (
                      <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                      </>
                    ) : "Login"
                  }
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
