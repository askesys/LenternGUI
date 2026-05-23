import { useEffect, useMemo, useState } from 'react'
import ingredientsData from '../data/ingredients.json'
import { MultiCheck } from './filters/MultiCheck';
import { SliderFilter } from '../components/filters/SliderFilter'

export default function FiltersBlock({onSubmit}){
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [maxCalories, setMaxCalories] = useState(0);
    const [maxCookingTime, setMaxCookingTime] = useState(0);

    const ingredientCategories = useMemo(() =>
        Array.from(
            new Set(
                ingredientsData.ingredients.map((entry) => entry.category || 'Other')
            )
        ),
        []
    );

    const [expandedCategories, setExpandedCategories] = useState(() =>
        ingredientCategories.reduce((acc, category) => ({
            ...acc,
            [category]: true,
        }), {})
    );

    const areAllExpanded =
        ingredientCategories.length > 0 &&
        ingredientCategories.every(
            (category) => expandedCategories[category] !== false
        );

    const handleIngredientsChange = (ids) => setSelectedIngredients(ids);
    const ChangeCalories = (e) => setMaxCalories(e.target.value);
    const ChangeCookingTime = (e) => setMaxCookingTime(e.target.value);

    const toggleAllCategories = () => {
        setExpandedCategories(
            ingredientCategories.reduce((acc, category) => ({
                ...acc,
                [category]: !areAllExpanded,
            }), {})
        );
    };

    const clearFilters = () => {
        setSelectedIngredients([]);
        setMaxCalories(0);
        setMaxCookingTime(0);
        setExpandedCategories(
            ingredientCategories.reduce((acc, category) => ({
                ...acc,
                [category]: true,
            }), {})
        );
    };

    useEffect(() => {
        onSubmit({
            ingredients: selectedIngredients,
            maxCalories,
            maxCookingTime
        });
    }, [selectedIngredients, maxCalories, maxCookingTime, onSubmit]);

    return (
        <aside className="filtersBlock">
            <div>
                <div className="filters-header-row">
                    <h3>Filters</h3>
                    <button
                        type="button"
                        className="clear-filters-btn"
                        onClick={clearFilters}
                    >
                        Clear filters
                    </button>
                </div>

                <div className="filter-section">
                    <div className="ingredients-header-row">
                        <span className="section-title">Ingredients</span>
                        <button
                            type="button"
                            className="ingredient-toggle-all"
                            onClick={toggleAllCategories}
                        >
                            {areAllExpanded ? 'Fold all' : 'Unfold all'}
                        </button>
                    </div>
                    <div className="ingredient-scroll-container">
                        <MultiCheck
                            name="Ingredients"
                            data={ingredientsData.ingredients}
                            value={selectedIngredients}
                            onChange={handleIngredientsChange}
                            expandedCategories={expandedCategories}
                            onExpandedCategoriesChange={setExpandedCategories}
                        />
                    </div>
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
            </div>
        </aside>
    )
}