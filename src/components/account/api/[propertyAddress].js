import { PropertyListing } from "../../ethereum/contracts";
import { db } from "../../firebase/Firebase";

export default async (req, res) => {
  const propertyAddress = req.query.propertyAddress;

  if (req.method !== "GET") {
    return res.status(405).json({});
  }
  try {
    const propertyContract = PropertyListing(propertyAddress);
    const propertyDetails = await propertyContract.methods
      .getPropertyDetails()
      .call();

    const {
      name,
      symbol,
      description,
      imageUrl,
      managerAddress,
      listingTimestamp,
      targetAmount,
    } = await db
      .collection("properties")
      .doc(propertyAddress)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          throw new Error("property does not exist");
        }
      });

    const result = {
      name,
      symbol,
      description,
      imageUrl,
      propertyAddress,
      listingTimestamp,
      managerAddress,
      targetAmount,
      sharesOutstanding: parseInt(propertyDetails[2]),
      balance: parseInt(propertyDetails[5]),
      status: parseInt(propertyDetails[7]),
    };

    console.log("GET /property /[propertyAddress] => ", result);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};
