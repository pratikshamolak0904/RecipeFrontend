import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Recipe.css'

const Recipe = ({ recipe, setRecipe, fetchRecipes, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [''],
    instructions: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients || [''],
        instructions: recipe.instructions,
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientsChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (recipe) {
        await axios.put(`https://recipe-backend-three-lac.vercel.app/api/updateRecipe/${recipe._id}`, formData);
        toast.success('Recipe updated successfully!');
      } else {
        await axios.post('https://recipe-backend-three-lac.vercel.app/api/addRecipe', formData);
        toast.success('Recipe added successfully!');
      }
      fetchRecipes();
      onClose();
    } catch (error) {
      toast.error('Error saving recipe');
    }
  };

  return (
    <div className="abc1">
      <div className="recipe-form">
      <h2>{recipe ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{recipe ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>
      <button type='onclick' onClick={onClose}>Back to Table</button>
    </div>
    </div>
  );
};

export default Recipe;
