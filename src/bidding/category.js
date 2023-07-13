import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/categories'); // Replace '/api/categories' with the appropriate API endpoint for fetching categories
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render the categories */}
      {categories.map(category => (
        <div key={category._id}>{category.name}</div>
      ))}
    </div>
  );
};

export default Categories;