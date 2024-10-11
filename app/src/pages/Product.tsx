import { useParams } from "react-router-dom";
import { ImmoCard } from "../components/core/ImmoCard";


function Product(){
    const { id } = useParams();
    return (
        <>
            <ImmoCard id={id} />
        </>
    )
}

export default Product;