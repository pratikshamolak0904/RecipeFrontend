import './Table.css';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Table = ({ recipes, setRecipe, fetchRecipes, setShowForm }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://recipe-backend-three-lac.vercel.app/api/deleteRecipe/${id}`);
      toast.success('Recipe deleted successfully!');
      fetchRecipes(); 
    } catch (error) {
      toast.error('Error deleting recipe');
    }
  };

  const handleEdit = (recipe) => {
    setRecipe(recipe); 
    setShowForm(true); 
  };

  return (
    <div className="recipe-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.name}</td>
                <td>{recipe.description}</td>
                <td>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </td>
                <td>{recipe.instructions}</td>
                <td>
                  <button onClick={() => handleEdit(recipe)} className="edit-btn">
                    <i className="fa-solid fa-pen-fancy"></i>
                  </button>
                  <button onClick={() => handleDelete(recipe._id)} className="delete-btn">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No recipes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
