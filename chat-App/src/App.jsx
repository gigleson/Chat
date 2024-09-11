
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Auth from "./pages/auth/index"
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import { useEffect, useState } from "react"
import { GET_USER_INFO } from "./utils/constants"
import { apiClient } from "./lib/api-client"

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  console.log(userInfo);
  const isAuthnacated = !!userInfo;
  return isAuthnacated ? children : <Navigate to="/auth" />;
}
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthnacated = !!userInfo;
  return isAuthnacated ? <Navigate to="/chat" /> : children;
}



const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
const [ loading, setLoading]  = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        console.log({ response })
        if(response.status==200 && response.data.id){
          setUserInfo(response.data)
        }else{
          setUserInfo(undefined);
        } 
        
      } catch  {
        setUserInfo(undefined);
    
      }finally{
        setLoading(false);
      }
    };
    
    if (!userInfo) {
      getUserData();
    } else {
      console.log("momo")
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);
  if (loading) {
    return <div>loading....</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthRoute> <Auth />  </AuthRoute>} />
        <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='*' element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App