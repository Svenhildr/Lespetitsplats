/**
 * Function to create a recipe card from the given recipe object.
 *
 * @param {Object} recipe - The recipe object containing information about the recipe.
 * @return {HTMLElement} The created card container element.
 */
export default function createRecipeCard(recipe) {
    // Create card container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "my-10", "w-1/4", "bg-white", "rounded-3xl", "overflow-hidden", "ml-20");

    // Create photo container
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("photo_container", "h-[253px]", "rounded-3xl", "mb-8", "relative");
    const photoImg = document.createElement("img");
    photoImg.src = `./assets/${recipe.image}`;
    photoImg.alt = recipe.name;
    photoImg.classList.add("object-cover", "w-full", "h-full");
    photoContainer.appendChild(photoImg);

    // Create time bubble
    const timeBubble = document.createElement("span");
    timeBubble.classList.add("time_buble", "px-4", "py-1", "text-[12px]", "bg-chicky-yellow", "rounded-3xl", "absolute", "top-6", "right-6");
    timeBubble.textContent = `${recipe.time} min`;
    photoContainer.appendChild(timeBubble);

    // Append photo container to card container
    cardContainer.appendChild(photoContainer);

    // Create card info
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card_info", "w-full", "px-7", "py-4");

    // Create card title
    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("card_title", "mt-5", "font-['Anton']", "font-extrabold", "text-lg", "mb-6");
    cardTitle.textContent = recipe.name;
    cardInfo.appendChild(cardTitle);

    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipe_container", "flex", "flex-col");
    cardInfo.appendChild(recipeContainer);

    // Create recipe content
    const recipeContent = document.createElement("div");
    recipeContent.classList.add("recipe_content", "max-h-28", "overflow-hidden", "mb-6");
    const recipeTitle = document.createElement("h3");
    recipeTitle.classList.add("recipe_title", "text-xs", "text-medium-grey", "font-bold", "mb-4");
    recipeTitle.textContent = "RECETTE";
    recipeContent.appendChild(recipeTitle);
    const recipeText = document.createElement("p");
    recipeText.classList.add("recipe", "text-wrap", "text-[12px]", "truncate");
    recipeText.textContent = recipe.description;
    recipeContent.appendChild(recipeText);
    recipeContainer.appendChild(recipeContent);

    // Create ingredients content
    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("ingredients_container", "mb-8", "flex", "flex-col", "justify-between", "w-full");

    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.classList.add("ingredients_title", "text-xs", "text-medium-grey", "font-bold", "mt-7", "mb-4");
    ingredientsTitle.textContent = "INGRÉDIENTS";
    ingredientsContainer.appendChild(ingredientsTitle);

    const ingredientContent = document.createElement("div");
    ingredientContent.classList.add("ingredients_content", "flex", "flex-row", "flex-wrap", "justify-between");

    recipe.ingredients.forEach((ingredient) => {
        const ingredientNameAndQty = document.createElement("div");
        ingredientNameAndQty.classList.add("ingredients_name_and_qty", "flex", "flex-col", "w-1/2", "gap-y-2", "mb-4");

        const ingredientName = document.createElement("p");
        ingredientName.classList.add("ingredients_name", "font-semibold", "text-[12px]");
        ingredientName.textContent = ingredient.ingredient;
        ingredientNameAndQty.appendChild(ingredientName);

        if (ingredient.quantity || ingredient.unit) {
            const ingredientQuantity = document.createElement("p");
            ingredientQuantity.classList.add("ingredients_quantity", "text-[14px]", "text-medium-grey");
            ingredientQuantity.textContent = `${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}`;
            ingredientNameAndQty.appendChild(ingredientQuantity);
        }

        ingredientContent.appendChild(ingredientNameAndQty);
    });

    ingredientsContainer.appendChild(ingredientContent);

    recipeContainer.appendChild(ingredientsContainer);

    // Append card info to card container
    cardContainer.appendChild(cardInfo);

    return cardContainer;
}
