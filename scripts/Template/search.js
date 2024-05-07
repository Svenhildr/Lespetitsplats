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
function search(recipes) {
    const mainSearchbar = document.getElementById("searchbar");
    let filteredRecipesTemp = filtersList.length === 0 ? recipes : filteredRecipesUpdate;
    filteredRecipesUpdate = [];
    if (mainSearchbar.value.length >= 3) {
        console.log(mainSearchbar.value);
        filteredRecipesTemp = recipes.filter((recipe) => {
            let recipeNameMatch = recipe.name.toLowerCase().includes(mainSearchbar.value);
            let recipeIngredientsMatch = recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(mainSearchbar.value));
            let recipeDescriptionMatch = recipe.description.toLowerCase().includes(mainSearchbar.value);
            return recipeIngredientsMatch || recipeNameMatch || recipeDescriptionMatch;
        });
        filteredRecipesUpdate = filteredRecipesTemp.filter((recipe) => !filtersList.some((existingRecipe) => existingRecipe.id === recipe.id));
    }
    cardDisplay(filteredRecipesTemp);
    // const updateEvent = new Event("recipesUpdated");
    // mainSearchbar.dispatchEvent(updateEvent);
    filterUpdate(filteredRecipesTemp);
}

/**
 * Updates the filtered recipes based on the applied tags (ingredients, appliances, ustensils).
 * @param {Array} filteredRecipesTemp The array of recipes filtered by the search query.
 * @param {boolean} isFilterDelete False by default, pass it to True when you delete a tag
 * @returns {void}
 */
export function filterUpdate(filteredRecipesTemp, isFilterDelete = false) {
    let filteredRecipesToUpdate = filteredRecipesUpdate.length === 0 ? recipes : filteredRecipesUpdate;

    if (isFilterDelete) {
        //condition pour forcer l'utilisation des "recipes" quand un tag est supprimé
        filteredRecipesToUpdate = recipes;
    }

    let filteredTagRecipes = filteredRecipesToUpdate.filter((recipe) => {
        return filtersList.every((selectedElement) => {
            let isIngredientMatch = recipe.ingredients.some((item) => item.ingredient.toLowerCase() === selectedElement.toLowerCase());

            let isApplianceMatch = recipe.appliance.toLowerCase() === selectedElement.toLowerCase();

            let isUstensilMatch = recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(selectedElement.toLowerCase()));

            // Retourne vrai si l'élément sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette
            return isIngredientMatch || isApplianceMatch || isUstensilMatch;
        });
    });
    filteredRecipesUpdate = filteredTagRecipes;
    cardDisplay(filteredRecipesUpdate);
    console.log(filteredRecipesUpdate);

    const mainSearchbar = document.getElementById("searchbar");
    // Crée un nouvel événement "recipesUpdated"
    const updateEvent = new Event("recipesUpdated");
    // Déclenche l'événement "recipesUpdated" sur la barre de recherche principale
    mainSearchbar.dispatchEvent(updateEvent);
}
