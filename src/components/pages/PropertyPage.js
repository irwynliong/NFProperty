import { useState, useEffect } from "react";
import './PropertyPage.css';
import { db } from "../firebase/Firebase";
import InvestorForm from "./InvestorForm";

// router
import { useParams } from "react-router-dom";



export const PropertyPage = () => {
  const { propertyId } = useParams();

  const [props, setProperty] = useState([]);

  useEffect(() => {
    const handlePropertyList = () => {
      // Get a reference to the database service
      // Get the data from the specified location in your database
      db
        .ref(`properties/${propertyId}`)
        .once("value")
        .then((snapshot) => {
          // Set the state with the retrieved data
          setProperty(snapshot.val());
        })
        .catch((error) => {
          console.error(error);
        });
    };
    handlePropertyList();
  }, [propertyId]);

  return (
    <div className="property-page">
      <img src={props.img}/>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <a href={InvestorForm} className="invest-btn">
          Invest Now!
      </a>
    </div>
    
  );
};

