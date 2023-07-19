import React from 'react';
import { useParams } from 'react-router-dom';

export const PropertyListing = () => {
    const {id} = useParams()
  return (
    <div>PropertyListing</div>
  )
}
