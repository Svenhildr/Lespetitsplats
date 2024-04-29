// import createTag from "./Template/createTag.js";
import { initTags } from "./tag.js";
import createCard from "./Template/createCard.js";
import mainFilter from "./Template/search.js";

// [ingredientTags, applianceTags, ustensilsTags] = generateTagList(recipes);
// let filtersList = [];
// let filteredRecipes = []; //liste des recettes filtrées

/**
 * Initialize the page by displaying recipe cards and creating tag lists for ingredients, appliances, and utensils.
 *
 * @param {array} recipes - The list of recipes to be displayed and used for generating tag lists.
 * @return {undefined} This function does not return any value.
 */
function init() {
    //affichage des cartes en fonction des recettes d'origine
    cardDisplay(recipes);
    //listener sur input pour tri et affichage des cartes triée
    mainFilter(recipes);

    initTags();
}

init();

/**
 * Display the recipe cards in the main container based on the provided recipes.
 *
 * @param {Array} displayRecipe - The array of recipes to be displayed - either former or filtered
 * @return {void}
 */
export function cardDisplay(displayRecipes) {
    const mainContainer = document.querySelector(".card_container");
    mainContainer.innerHTML = "";
    // Crée une carte pour chaque recette dans les données récupérées
    // console.log(displayRecipes);
    displayRecipes.forEach((recipe) => {
        const recipeCard = createCard(recipe);
        mainContainer.appendChild(recipeCard);
    });
}
