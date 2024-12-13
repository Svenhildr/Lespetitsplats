import { cardDisplay } from "../index.js";
import { filtersList } from "../tag.js";

export let filteredRecipesUpdate = [];

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
export function search(recipes) {
    const mainSearchbar = document.getElementById("searchbar");
    let filteredRecipesTemp = filtersList.length === 0 ? recipes : filteredRecipesUpdate;
    filteredRecipesUpdate = [];

    if (mainSearchbar.value.length >= 3) {
        const searchValue = mainSearchbar.value.toLowerCase();
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            let recipeNameMatch = recipe.name.toLowerCase().includes(searchValue);
            let recipeDescriptionMatch = recipe.description.toLowerCase().includes(searchValue);
            let recipeIngredientsMatch = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                if (ingredient.includes(searchValue)) {
                    recipeIngredientsMatch = true;
                    break;
                }
            }
            if (recipeNameMatch || recipeDescriptionMatch || recipeIngredientsMatch) {
                filteredRecipesUpdate.push(recipe);
            }
        }
    } else {
        filteredRecipesUpdate = recipes;
    }

    cardDisplay(filteredRecipesUpdate);
    filterUpdate(false, true);
}

export function filterUpdate(isFilterDelete = false, isNameSearch = false) {
    const mainSearchbar = document.getElementById("searchbar");
    const isMainSearchActive = mainSearchbar.value.length >= 3;
    let filteredRecipesToUpdate;

    if (isFilterDelete) {
        if (isMainSearchActive) {
            search(recipes);
            filteredRecipesToUpdate = filteredRecipesUpdate;
        } else {
            filteredRecipesToUpdate = recipes;
        }
    } else {
        filteredRecipesToUpdate = filteredRecipesUpdate.length === 0 ? recipes : filteredRecipesUpdate;
    }

    let filteredTagRecipes = filteredRecipesToUpdate.filter((recipe) => {
        return filtersList.every((selectedElement) => {
            let isIngredientMatch = recipe.ingredients.some((item) => item.ingredient.toLowerCase() === selectedElement.toLowerCase());
            let isApplianceMatch = recipe.appliance.toLowerCase() === selectedElement.toLowerCase();
            let isUstensilMatch = recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(selectedElement.toLowerCase()));
            return isIngredientMatch || isApplianceMatch || isUstensilMatch;
        });
    });

    filteredRecipesUpdate = filteredTagRecipes;
    cardDisplay(filteredRecipesUpdate);

    const updateEvent = new Event("recipesUpdated");
    mainSearchbar.dispatchEvent(updateEvent);
}
