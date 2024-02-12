import { GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleAuth = ()=>{
    const clientId = "895436099170-hskjhgvre26klm8r7udthp3ea8a0m8j2.apps.googleusercontent.com"
    const navigate = useNavigate()
    return (
        <div className="container_google">
            <GoogleOAuthProvider clientId={clientId} >
            <GoogleLogin onSuccess={credentialResponse => {
            console.log(credentialResponse); navigate('/dashboard')}} onError={() => {console.log('Falha no login')}}/>
            </GoogleOAuthProvider>
        </div>
            );
};

export default GoogleAuth
    