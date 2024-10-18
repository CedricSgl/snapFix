import { useParams } from "react-router-dom";
import ImmoRegistration from "../components/core/ImmoRegistration";


function Registration(){
    const { id } = useParams();
    console.log('ImmoRegistration --> Update ',id)
    return (
        <>
        <ImmoRegistration />
        </>
    )
}

export default Registration;