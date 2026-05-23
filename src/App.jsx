import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllRecipes from "./pages/AllRecipes";
import RecipePage from "./pages/RecipePage";
import { RecipeProvider } from "./context/RecipeContext";
import "./App.css";

export default function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllRecipes />} />
          <Route path="/recipe/create" element={<RecipePage />} />
          <Route path="/recipe/:id/edit" element={<RecipePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
      </BrowserRouter>
    </RecipeProvider>
  );
}