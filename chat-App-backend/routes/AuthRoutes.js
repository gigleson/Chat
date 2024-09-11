import { Router } from "express"
import { getUserInfo, login, signup ,updateProfile ,appProfileImage,removeProfileImage} from "../controller/AuthController.js"
import { varifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";


const authRoute = Router();
const upload=multer({dest   : "uploads/profiles/"})
authRoute.post("/signup",signup);
authRoute.post("/login",login);
authRoute.get("/user-info",varifyToken,getUserInfo)
authRoute.post("/update-profile",varifyToken,updateProfile)
authRoute.post("/add-profile-image",varifyToken,upload.single('profile-image'),appProfileImage)
authRoute.delete("/remove-profile-image",varifyToken,removeProfileImage)

export default authRoute;   