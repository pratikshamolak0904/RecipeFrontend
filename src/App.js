import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Pages/Search';
import Recipe from './Pages/Recipe';
import Table from './Pages/Table';
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('https://recipe-backend-three-lac.vercel.app/api/getRecipes');
      setRecipes(response.data.message);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Error fetching recipes.');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleAddRecipe = () => {
    setRecipe(null);
    setShowForm(true);
  };

  const handleBackToTable = () => {
    setShowForm(false);
    fetchRecipes();
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <div>
        <h1>Recipe Manager</h1>
        {showForm ? (
          <Recipe recipe={recipe} setRecipe={setRecipe} fetchRecipes={fetchRecipes} onClose={handleBackToTable} />
        ) : (
          <>
            <button type='Submit1' onClick={handleAddRecipe}>
            <i class="fa-solid fa-cart-plus"></i>
            </button>
            <Search setRecipes={setRecipes} fetchRecipes={fetchRecipes} />
            <Table recipes={recipes} setRecipe={setRecipe} fetchRecipes={fetchRecipes} setShowForm={setShowForm} />
          </>
        )}
      </div>
    </>
  );
};

export default App;
