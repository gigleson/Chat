import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Chat = () => {
  const {userInfo} = useAppStore();
  const navagate = useNavigate();
  
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("plz setup the profile page to contunue")
      navagate("/profile")
    }

  },[userInfo,navagate])


  return (
    <div>Chat</div>
  )
}

export default Chat