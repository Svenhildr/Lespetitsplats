let ingredientTags = [];
let applianceTags = [];
let ustensilsTags = [];

import { generateTagList } from "./tag.js";
import createCard from "./Template/createCard.js";
import createTag from "./Template/createTag.js";

/**
 * Initialize the page by displaying recipe cards and creating tag lists for ingredients, appliances, and utensils.
 *
 * @param {array} recipes - The list of recipes to be displayed and used for generating tag lists.
 * @return {undefined} This function does not return any value.
 */
function init() {
    cardDisplay(recipes);
    // generateTagList(recipes);
    [ingredientTags, applianceTags, ustensilsTags] = generateTagList(recipes);
    // applianceTags = generateTagList(recipes);
    // ustensilsTags = generateTagList(recipes);
    /*     console.log(ingredientTags);
    console.log(applianceTags);
    console.log(ustensilsTags); */
    createTag(ingredientTags, "ingredients");
    createTag(applianceTags, "appliances");
    createTag(ustensilsTags, "ustensils");
}

init();

/**
 * Display the recipe cards in the main container based on the provided recipes.
 *
 * @param {Array} recipes - The array of recipes to be displayed
 * @return {void}
 */
function cardDisplay(recipes) {
    const mainContainer = document.querySelector(".card_container");
    // Crée une carte pour chaque recette dans les données récupérées
    recipes.forEach((recipe) => {
        const recipeCard = createCard(recipe);
        mainContainer.appendChild(recipeCard);
    });
}