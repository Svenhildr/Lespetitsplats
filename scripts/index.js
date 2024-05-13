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
    console.log("cardDisplay call");
    const mainContainer = document.querySelector(".card_container");
    mainContainer.innerHTML = "";
    //mise à jour du nombre de recette
    updateRecipeNumber(displayRecipes.length);
    if (displayRecipes.length === 0) {
        const userSearch = document.getElementById("searchbar").value;
        const errorMsg = document.createElement("p");
        errorMsg.classList.add("errorMsg", "font-['Anton']", "text-medium-grey", "font-bold", "text-center");
        errorMsg.innerHTML = `Aucune recette ne contient « <span style="color: black">${userSearch} </span>» .<br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        mainContainer.appendChild(errorMsg);

        // "`Aucune recette ne contient XXX. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;"; // Supprime le texte du nombre de recettes
        return;
    }
    // Crée une carte pour chaque recette dans les données récupérées
    displayRecipes.forEach((recipe) => {
        const recipeCard = createCard(recipe);
        mainContainer.appendChild(recipeCard);
    });
}

function updateRecipeNumber(count) {
    // console.log(count);
    const recipeNumberElement = document.querySelector(".recipe-number");
    recipeNumberElement.textContent = `${count} recette${count <= 1 ? "" : "s"}`;
}
