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
    const updateEvent = new Event("recipesUpdated");
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
    mainSearchbar.dispatchEvent(updateEvent);
    recipesFilterUpdate();
}

export function recipesFilterUpdate(filteredRecipesTemp) {
    let filteredTagRecipes = filteredRecipesUpdate.filter((recipe) => {
        return filtersList.every((selectedElement) => {
            let isIngredientMatch = recipe.ingredients.some((item) => item.ingredient.toLowerCase() === selectedElement.toLowerCase());

            let isApplianceMatch = recipe.appliance.toLowerCase() === selectedElement.toLowerCase();

            let isUstensilMatch = recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(selectedElement.toLowerCase()));

            // Retourner vrai si l'élément sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette
            return isIngredientMatch || isApplianceMatch || isUstensilMatch;
        });
    });
    cardDisplay(filteredTagRecipes);
}

/* function filterByIngredients(recipes) {
    const dropdownFilter = document.getElementById("ingredients");
    let filteredIngredients = recipes.filter((recipe) => {
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(filtersList.ingredient));
    });
    cardDisplay(filteredIngredients);
} */

/* tagListUpdated.every(selectedElement => {
    let isIngredientMatch = recipe.ingredients.some(
        item => item.ingredient.toLowerCase() === selectedElement.toLowerCase()
    );
    // Vérifier si l'élément sélectionné correspond à l'appareil de la recette
    let isApplianceMatch =
        recipe.appliance.toLowerCase() === selectedElement.toLowerCase();

    // Vérifier si l'élément sélectionné est présent dans les ustensiles de la recette
    let isUstensilMatch = recipe.ustensils.some(ustensil =>
        ustensil.toLowerCase().includes(selectedElement.toLowerCase())
    );

    // Retourner vrai si l'élément sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette

    return isIngredientMatch || isApplianceMatch || isUstensilMatch; */
