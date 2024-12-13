/**
 * Updates the filtered recipes based on the applied tags (ingredients, appliances, ustensils).
 * @param {Array} filteredRecipesTemp The array of recipes filtered by the search query.
 * @param {boolean} isFilterDelete False by default, pass it to True when you delete a tag
 * @returns {void}
 */

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
