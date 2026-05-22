import { useState } from 'react'
import ingredientsData from '../data/ingredients.json'
import { MultiCheck } from './filters/MultiCheck';
import { SliderFilter } from '../components/filters/SliderFilter'

export default function FiltersBlock({onSubmit}){
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [maxCalories, setMaxCalories] = useState(0);
    const [maxCookingTime, setMaxCookingTime] = useState(0);

    const handleIngredientsChange = (ids) => setSelectedIngredients(ids);
    const ChangeCalories = (e) => setMaxCalories(e.target.value);
    const ChangeCookingTime = (e) => setMaxCookingTime(e.target.value);

    function handleForm(e) {
        e.preventDefault();
        onSubmit({
            ingredients: selectedIngredients,
            maxCalories,
            maxCookingTime
        });
    }

    return (
        <aside className="filtersBlock">
            <form onSubmit={handleForm}>
                <h3>Filters</h3>

                <div className="filter-section">
                    <span className="section-title">Ingredients</span>
                    <MultiCheck
                        name="Ingredients"
                        data={ingredientsData.ingredients}
                        value={selectedIngredients}
                        onChange={handleIngredientsChange}
                    />
                </div>

                <div className="filter-section">
                    <SliderFilter id="calories" max="2200" value={maxCalories} onChange={ChangeCalories}>
                        Maximum Calories:
                    </SliderFilter>
                </div>

                <div className="filter-section">
                    <SliderFilter id="cookingTime" max="180" value={maxCookingTime} onChange={ChangeCookingTime}>
                        Maximum Cooking Time (min):
                    </SliderFilter>
                </div>

                <button type="submit" className="filter-submit">
                    Apply
                </button>
            </form>
        </aside>
    )
}