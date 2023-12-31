// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./PropertyListing.sol";

contract ListingProducer {
    address[] public ListingAddresses;

    event ListProperty(address indexed listingAddress);

    function listProperty(string calldata name, uint256 targetAmount) public {
        PropertyListing c = new PropertyListing(name, targetAmount, msg.sender);
        ListingAddresses.push(address(c));
        emit ListProperty(address(c));
    }

    function getListingAddresses() public view returns (address[] memory) {
        return ListingAddresses;
    }

}