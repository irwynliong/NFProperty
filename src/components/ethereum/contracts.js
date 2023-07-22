import web3 from "web3";
import contracts from "./build/contracts.json";

const ListingProducer = new web3.eth.Contract(
  contracts.ListingProducer.abi,
  "0x3c4137472bB09D562A0dDf33E2c847789930EFd9"
);

const PropertyListing = (listingAddress) => {
  return new web3.eth.Contract(contracts.PropertyListing.abi, listingAddress);
};

export { ListingProducer, PropertyListing };