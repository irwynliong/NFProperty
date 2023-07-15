import web3 from "../../web3";
import contracts from "./build/contracts.json";

const ListingProducer = new web3.eth.Contract(
  contracts.ListingProducer.abi,
  process.env.NEXT_PUBLIC_CAMPAIGN_PRODUCER_ADDRESS //
);

const PropertyListing = (listingAddress) => {
  return new web3.eth.Contract(contracts.PropertyListing.abi, listingAddress);
};

export { ListingProducer, PropertyListing };