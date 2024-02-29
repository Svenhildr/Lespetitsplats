/**
 * Generates a list of unique ingredients, appliances, and utensils from the given recipes.
 *
 * @param {Array} recipes - An array of recipe objects
 * @return {Array} An array containing unique ingredients, unique appliances, and unique utensils
 */
export function generateTagList(recipes) {
    let ingredientsSet = new Set();
    let appliancesSet = new Set();
    let ustensilsSet = new Set();

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredientsSet.add(ingredient.ingredient.trim().toLowerCase());
        });
        appliancesSet.add(recipe.appliance.trim().toLowerCase());
        recipe.ustensils.forEach((ustensil) => {
            ustensilsSet.add(ustensil.trim().toLowerCase());
        });
    });

    return [Array.from(ingredientsSet).sort(), Array.from(appliancesSet).sort(), Array.from(ustensilsSet).sort()];
}
openDropdown();
function openDropdown() {
    const dropdownIcon = document.querySelectorAll(".dropdown-icon-down");
    console.log(dropdownIcon);
    dropdownIcon.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            const dropdownContainer = e.target.closest(".content_dropdown");
            console.log(dropdownContainer);
            drow;
        });
    });
}

export default { generateTagList };
