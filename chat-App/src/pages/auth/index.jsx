import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"


const Auth = () => {
  const navagate = useNavigate();
  const {setUserInfo} =useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const valationSignup = () => {

    if (!email.length) {
      toast.error("Email is required")
      return false
    }
    if (!password.length) {
      toast.error("Password is required")
      return false
    }
    if (!confirmPassword.length || !(password === confirmPassword)) {
      toast.error("password and conformpassword should be same")
      return false
    }
    return true
  }
  const valationLogin = () => {

    if (!email.length) {
      toast.error("Email is required")
      return false
    }
    if (!password.length) {
      toast.error("Password is required")
      return false
    }

    return true
  }

  const handleLogin = async (params) => {
    if (valationLogin()) {

      const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
      
      if (response.data.user.id) {
        
        setUserInfo(response.data.user)
        if (response.data.user.profileSetup) {
          navagate("/chat")
        }else{ 
          navagate("/profile")
        }
       
        
      }
      console.log({ response });

    }


  }
  const handleSignup = async () => {
    if (valationSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
      if (response.status === 201) {
        setUserInfo(response.data.user)
        navagate("/profile")
  
      }
      console.log({ response });
    }

  };










  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Acme</CardTitle>
          <CardDescription>Experience the best tools for building modern web applications.</CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="border-b">
          <TabsList className="flex w-full">
            <TabsTrigger value="login" className="flex-1 py-2 text-sm font-medium">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex-1 py-2 text-sm font-medium">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" vaule={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-muted-foreground" prefetch={false}>
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" vaule={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleLogin}>Sign In</Button>
            </CardContent>
          </TabsContent>
          <TabsContent value="signup">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" vaule={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" vaule={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2" >
                <Label htmlFor="name">Conform Password</Label>
                <Input id="name" type="password" vaule={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <Button className="w-full" onClick={handleSignup}>Sign Up</Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default Auth

