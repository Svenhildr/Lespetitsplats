import { initTags } from "./tag.js";
import createCard from "./Template/createCard.js";
import mainFilter from "./Template/search.js";

/**
 * Initializes the application by displaying recipe cards based on the original recipes,
 * adding a listener on the input for filtering and displaying sorted cards, and initializing tags.
 *
 * @function init
 * @returns {void}
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
 * Displays recipe cards based on the provided list of recipes.
 *
 * @function cardDisplay
 * @param {Array} displayRecipes - An array of recipe objects to be displayed
 * @returns {void}
 */
export function cardDisplay(displayRecipes) {
    const mainContainer = document.querySelector(".card_container");
    mainContainer.innerHTML = "";
    // Crée une carte pour chaque recette dans les données récupérées
    displayRecipes.forEach((recipe) => {
        const recipeCard = createCard(recipe);
        mainContainer.appendChild(recipeCard);
    });
}
