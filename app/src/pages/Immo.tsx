import { useParams } from "react-router-dom";
import { ImmoCard } from "../components/core/ImmoCard";
import { ContactRegistration } from "../components/core/ContactRegistration";


function Immo(){
    const { id } = useParams();
    console.log('product ',id)
    return (
        <>
            <ImmoCard id={id} />
            <ContactRegistration />
        </>
    )
}

export default Immo;