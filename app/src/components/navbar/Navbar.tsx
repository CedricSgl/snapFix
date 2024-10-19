import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ImmoProperty } from "../../types/immo";
import { getAllImmoProperties } from "../../services/api";

export function Navbar(){
    const [properties, setProperties] = useState<ImmoProperty[]>([])
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getAllImmoProperties();
                setProperties(data);
            } catch (error) {
                console.error('Failed to fetch : ', error)
            }
        };
        fetchProperties();
    },[]);
    return (
        <div>
            <ul>
            {properties.map(property => (
                <li><NavLink to={"/immo/"+property._id}>{property.title}</NavLink></li>
                
            ))
            }
            </ul>
        </div>
    )
    /*return (
        <>
        
            <NavLink to="/immo/1" >Immo 1</NavLink>
            <NavLink to="/immo/2" >Immo 2</NavLink>
        </>
    )*/
}