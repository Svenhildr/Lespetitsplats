import { cardDisplay } from "../index.js";
import { filtersList } from "../tag.js";

export let filteredRecipes = [];

/**
 * Attaches an event listener to the main search bar to filter recipes when the input value changes.
 *
 * @function mainFilter
 * @param {Array} recipes - An array of recipe objects
 * @returns {void}
 */
export default function mainFilter(recipes) {
    const mainSearchbar = document.getElementById("searchbar");
    mainSearchbar.addEventListener("input", (event) => {
        event.preventDefault();
        search(recipes);
    });
}

/**
 * Searches for recipes based on the input value in the search bar and updates the filtered recipes list accordingly.
 *
 * @function search
 * @param {Array} recipes - An array of recipe objects
 * @returns {void}
 */
function search(recipes) {
    const mainSearchbar = document.getElementById("searchbar");
    let filteredRecipesTemp = filtersList.length === 0 ? recipes : filteredRecipes;
    const updateEvent = new Event("recipesUpdated");
    filteredRecipes = [];
    if (mainSearchbar.value.length >= 3) {
        console.log(mainSearchbar.value);
        filteredRecipesTemp = recipes.filter((recipe) => {
            let recipeNameMatch = recipe.name.toLowerCase().includes(mainSearchbar.value);
            let recipeIngredientsMatch = recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(mainSearchbar.value));
            let recipeDescriptionMatch = recipe.description.toLowerCase().includes(mainSearchbar.value);
            return recipeIngredientsMatch || recipeNameMatch || recipeDescriptionMatch;
        });
        filteredRecipes = filteredRecipesTemp.filter((recipe) => !filtersList.some((existingRecipe) => existingRecipe.id === recipe.id));
        console.log(filteredRecipes);
    }
    cardDisplay(filteredRecipesTemp);
    mainSearchbar.dispatchEvent(updateEvent);
}

/* function filterByIngredients(recipes) {
    const dropdownFilter = document.getElementById("ingredients");
    let filteredIngredients = recipes.filter((recipe) => {
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(filtersList.ingredient));
    });
    cardDisplay(filteredIngredients);
} */
