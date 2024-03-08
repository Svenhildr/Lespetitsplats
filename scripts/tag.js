import createTag from "./Template/createTag.js";

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

export function initTag(tags, nameTag) {
    let mainTagElt = document.querySelector(`#${nameTag}`);
    createTag(tags, nameTag);
    closedDropdown(mainTagElt);
    // openedDropdown(mainTagElt);
}

function closedDropdown(mainTagElt) {
    const dropdownIconUp = mainTagElt.querySelector(".dropdown-icon-up");
    // console.log(dropdownIconUp);
    const dropdownContent = mainTagElt.querySelector(".filter_container");
    dropdownContent.classList.remove("open");
    dropdownIconUp.classList.remove("fa-chevron-up", "dropdown-icon-up");
    dropdownIconUp.classList.add("fa-chevron-down", "dropdown-icon-down");

    const clickHandler = (e) => {
        openedDropdown(mainTagElt, e.target);
        dropdownIconUp.removeEventListener("click", clickHandler);
    };

    dropdownIconUp.addEventListener("click", clickHandler);
}

function openedDropdown(mainTagElt, dropdownIcon) {
    mainTagElt.querySelector(".filter_container").classList.add("open");
    dropdownIcon.classList.add("fa-chevron-up", "dropdown-icon-up");
    dropdownIcon.classList.remove("fa-chevron-down", "dropdown-icon-down");

    const clickHandler = (e) => {
        closedDropdown(mainTagElt);
        dropdownIcon.removeEventListener("click", clickHandler);
    };

    dropdownIcon.addEventListener("click", clickHandler);
}

export default { generateTagList };
