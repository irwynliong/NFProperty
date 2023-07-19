import React, { useState } from 'react';
import './Form.css'; // Import the CSS file
import { db, storage } from '../firebase/Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection } from 'firebase/firestore'; 
import { AccountContext } from '../account/context/AccountContext';

const PropertyForm = ({ onSubmit, onCancel }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [realEstateName, setRealEstateName] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [delistDate, setDelistDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [account, setAccount] = React.useContext(AccountContext);

  const propertiesRef = collection(db, "properties");

  //when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (imageFile) {
      // Upload the image file to storage
      const storageRef = ref(storage, `images/${account}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress updates here
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Get the download URL of the uploaded image
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // Save the data to Firestore
            setDoc(doc(propertiesRef), {
              realEstateName: realEstateName,
              targetAmount: targetAmount,
              totalTokens: totalTokens,
              delistDate: delistDate,
              managerAddress: account,
              imageUrl: url
            })
            .then(() => {
              onSubmit(); // Call the parent component's onSubmit function
            })
            .catch((error) => {
              console.error('Error adding property:', error);
            });
          });
        }
      );
    } else {
      alert('Please select an image file first!');
    }
  };

  return (
    <div>
      <h3>List a Property</h3>
      <form className='property-form'>
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
        
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;


