import React, { cloneElement, useEffect, useState } from 'react';
import './Form.css'; // Import the CSS file
import db from '../firebase/Firebase';
import { doc, setDoc, collection } from "firebase/firestore"; 
import { AccountContext } from "../account/context/AccountContext";
//import { Property } from "../contracts/Property"
import web3 from '../../web3';
import { WalletSDKRelayAbstract } from '@coinbase/wallet-sdk/dist/relay/WalletSDKRelayAbstract';


const PropertyForm = ({ onSubmit, onCancel }) => {
  
  const [realEstateName, setRealEstateName] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [delistDate, setDelistDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [account, setAccount] = React.useContext(AccountContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const propertiesRef = collection(db, "properties");

  //when form is submitted
  const handleSubmit = (e) => {
    console.log(account);
    e.preventDefault();
    /*if (!account) {
      //popup("Please connect wallet first");
      return;
    }*/
    // New FireBase 
    //console.log(account);
    
    setDoc(doc(propertiesRef), {
      realEstateName: realEstateName,
        targetAmount: targetAmount,
        totalTokens: totalTokens,
        delistDate: delistDate,
        managerAddress: account
    })
    .then( () => {
      if (imageFile) {
        // Upload the image file to storage
        const storageRef = db.storage().ref();
        const imageRef = storageRef.child(`images/${account}`);
        imageRef.put(imageFile).then(() => {
          console.log('Image uploaded successfully');
          onSubmit(); // Call the parent component's onSubmit function
        });
      } else {
        //onSubmit();
      }
    })
    .catch((error) => {
      console.error('Error adding property:', error);
    });
  };

  return (
    <div>
      <h3>List a Property</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Real Estate Name:
          <input
            type="text"
            placeholder='Super Fancy House'
            value={realEstateName}
            onChange={(e) =>
              setRealEstateName(e.target.value.substring(0, 31))
            }
            error={realEstateName > 30}
          />
        </label>
        <label>
          Target Amount (ETH):
          <input
            type="number"
            placeholder='0.1'
            value={targetAmount}
            onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
            error={!!targetAmount && targetAmount <= 0}
          />
        </label>
        <label>
          Total Tokens Offered:
          <input
            type="number"
            placeholder='10'
            value={totalTokens}
            onChange={(e) => setTotalTokens(parseInt(e.target.value))}
          />
        </label>
        <label>
          Delist Date:
          <input
            type="date"
            value={delistDate}
            onChange={(e) => setDelistDate(e.target.value)}
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                const file = e.target.files[0];
                if (file.size < 1000000) {
                  setImageFile(file);
                } else {
                  console.log("Sorry, file size must be under 1MB");
                }
              }
            }}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;

