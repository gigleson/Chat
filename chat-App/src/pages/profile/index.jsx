  import { useAppStore } from "@/store"
  import { Navigate, useNavigate } from "react-router-dom";
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import { useEffect, useState } from "react";
  import { toast } from "sonner";
  import { apiClient } from "@/lib/api-client";
  import { ADD_PROFILE_IMAGE_ROUTE, HOST, UPDATE_PROFILE_ROUTE } from "@/utils/constants";


  const Profile = () => {

    
    const navigate =useNavigate();
    const  {userInfo,setUserInfo}= useAppStore();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [selectedColor, setSelectedColor] = useState('bg-white')
    const [profileImage, setProfileImage] = useState('/placeholder.svg?height=100&width=100');

    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500', 
      'bg-purple-500',
    ]
    
    useEffect(() => {
      if(userInfo.profileSetup){
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName)
        setSelectedColor(userInfo.color)

        
      }
      
      if(userInfo.image){
        setProfileImage(`${HOST}/${userInfo.image}`)
    }

    }, [userInfo])
    

    const validateProfile =()=>{
      if(!firstName){
        toast("first name is required")
        return false
      }
      if(!lastName){
        toast("last name is required")
        return false
      }
      return true
    }
    const saveChange= async () => {
      if(validateProfile()){
        try {
          const response =await apiClient.post(UPDATE_PROFILE_ROUTE,{firstName,lastName,colour:selectedColor},{withCredentials:true})
          if (response.status===200 && response.data){
            setUserInfo({...response.data});
            toast.success("Profile has been created")

          }
          
        } catch (error) {
          console.log({error})
          
        }
      }

      
    }

    const handleImageUpload =async(event)=>{
      const file =event.target.files[0];
      console.log({file})
      if(file){
        const formData = new FormData();
        formData.append("profile-image",file);
        console.log(formData)
        const responce = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE,formData,{withCredentials:true})
        if(responce.status===200 || responce.data.image){
          setUserInfo({...userInfo, image: responce.data.image});
          toast.success("Image added sucefully")

        }
      
      }

    }


    return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center">
          <div className={`rounded-full p-1 ${selectedColor} border-4`}>
            <Avatar className="w-40 h-40">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback>{}</AvatarFallback>
            </Avatar>
          </div>
          <Input
            type="file"
            onChange={handleImageUpload}
            name ="profile-image"
            className="mt-6 w-full max-w-[250px]"
            accept=".png"
          />
          <div className="mt-6 w-full max-w-[250px]">
            <Label className="mb-2 block js text-center">Select Profile Color</Label>
            <div className="flex justify-between">
              {colors.map((color) => (
                <Button
                  key={color}
                  className={`w-10 h-10 rounded-full ${color.replace('border', 'bg')}`}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }} // Set correct background color
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-3xl space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" disabled value ={userInfo.email} className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" onChange={(e)=> setFirstName(e.target.value)} value={firstName} className="w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" placeholder="Enter your last name" onChange={(e)=> setLastName(e.target.value)} value={lastName} className="w-full" />
          </div>
          <Button className="w-full mt-6" onClick={saveChange}>Save Profile</Button>
        </div>
      </div>
    </div>
  </div>

    )
  }

  export default Profile