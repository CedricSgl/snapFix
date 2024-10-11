import { useParams } from "react-router-dom";
import { ImmoCard } from "../components/core/ImmoCard";
import { ContactRegistration } from "../components/core/contactRegistration";


function Product(){
    const { id } = useParams();
    console.log('product ',id)
    return (
        <>
            <ImmoCard id={id} />
            <ContactRegistration />
        </>
    )
}

export default Product;