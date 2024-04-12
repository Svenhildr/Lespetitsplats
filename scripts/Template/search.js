export default function mainFilter(recipes) {
    const mainSearchbar = document.getElementById("searchbar");
    const mainSearchButton = document.querySelector("main_search_button");

    mainSearchbar.addEventListener("input", (event) => {
        event.preventDefault();

        if (mainSearchbar.value.length >= 3) {
            console.log(mainSearchbar.value);
            let filteredRecipes = recipes.filter((recipe) => {
                let recipeNameMatch = recipe.name.toLowerCase().includes(mainSearchbar.value);
                let recipeIngredientsMatch = recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(mainSearchbar.value));
                let recipeDescriptionMatch = recipe.description.toLowerCase().includes(mainSearchbar.value);
                return recipeIngredientsMatch || recipeNameMatch || recipeDescriptionMatch;
            });
            console.log(filteredRecipes);
        }
    });
}

function filteredTag(recipes, nameTag) {
    let filteredtags = recipes.filter((recipe) => {
        let ingredientTag = recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(mainSearchbar.value));
        return ingredientTag;
    });
    console.log(filteredtags);
}

/*function eltFilter(recipes) {
    console.log(eltFilter(recipes));
     const searchTermLower = letters.toLowerCase();
    for (let i = 0; i < elts.length; i++) {
        if (elts[i].textContent.toLowerCase().includes(searchTermLower)) {
            elts[i].style.display = "block";
        } else {
            elts[i].style.display = "none";
        }
    } 
}*/
