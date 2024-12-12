import { cardDisplay } from "./index.js";
import { filteredRecipesUpdate, filterUpdate, search } from "./Template/search.js";
export let filtersList = []; //liste des filtres

let ingredientTags = generateTagList(recipes)[0];
let applianceTags = generateTagList(recipes)[1];
let ustensilsTags = generateTagList(recipes)[2];
const iconElement = document.createElement("i");

/**
 * Generates tag lists for ingredients, appliances, and utensils based on the given list of recipes.
 *
 * @function generateTagLists
 * @param {Array} recipesList - An array of recipe objects
 * @returns {void}
 */
function generateTagLists(recipesList) {
    ingredientTags = generateTagList(recipesList)[0];
    applianceTags = generateTagList(recipesList)[1];
    ustensilsTags = generateTagList(recipesList)[2];
}

/**
 * Generates a list of unique ingredients, appliances, and utensils from the given recipes.
 *
 * @param {Array} recipesList - An array of recipe objects
 * @return {Array} An array containing unique ingredients, unique appliances, and unique utensils
 */
export function generateTagList(recipesList) {
    let ingredientsSet = new Set();
    let appliancesSet = new Set();
    let ustensilsSet = new Set();

    recipesList.forEach((recipe) => {
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

/**
 * Updates the tags based on the filtered recipes.
 * If no recipes are filtered, uses the complete list of recipes.
 *
 * @function onRecipesUpdated
 * @returns {void}
 */
function onRecipesUpdated() {
    generateTagLists(filteredRecipesUpdate.length == 0 ? recipes : filteredRecipesUpdate);

    createTagList(ingredientTags, "ingredients");
    createTagList(applianceTags, "appliances");
    createTagList(ustensilsTags, "ustensils");
}

/**
 * Initializes the tags for ingredients, appliances, and utensils.
 * Also, sets up an event listener to update tags when recipes are updated.
 *
 * @function initTags
 * @returns {void}
 */
export function initTags() {
    initTag(ingredientTags, "ingredients");
    initTag(applianceTags, "appliances");
    initTag(ustensilsTags, "ustensils");
    document.getElementById("searchbar").addEventListener("recipesUpdated", onRecipesUpdated);
}

/**
 * Initializes a specific tag element.
 *
 * @function initTag
 * @param {Array} tags - The list of tags to be initialized
 * @param {string} nameTag - The ID of the tag element
 * @returns {void}
 */
export function initTag(tags, nameTag) {
    let mainTagElt = document.querySelector(`#${nameTag}`);
    createTagList(tags, nameTag);
    toggleDropdown(mainTagElt);
    inputTagSearch(tags, mainTagElt, tags, nameTag);
}

/**
 * Toggles the dropdown menu of the main tag element.
 *
 * @function toggleDropdown
 * @param {HTMLElement} mainTagElt - The main tag element containing the dropdown menu
 * @returns {void}
 */
function toggleDropdown(mainTagElt) {
    const dropdownContent = mainTagElt.querySelector(".filter_container");
    const dropdownIcon = mainTagElt.querySelector(".dropdown-icon");
    dropdownIcon.addEventListener("click", () => {
        const allOpenDropdowns = document.querySelectorAll(".filter_container.open");
        allOpenDropdowns.forEach((openDropdown) => {
            if (openDropdown !== dropdownContent) {
                openDropdown.classList.remove("open");
                const openDropdownIcon = openDropdown.parentElement.querySelector(".dropdown-icon");
                openDropdownIcon.classList.remove("fa-chevron-up", "dropdown-icon-up");
                openDropdownIcon.classList.add("fa-chevron-down", "dropdown-icon-down");
            }
        });

        if (!dropdownContent.classList.contains("open")) {
            openedDropdown(mainTagElt, dropdownIcon);
        } else {
            closedDropdown(mainTagElt, dropdownIcon);
        }
    });
}

/**
 * Closes the dropdown menu of the main tag element.
 *
 * @function closedDropdown
 * @param {HTMLElement} mainTagElt - The main tag element containing the dropdown menu
 * @param {HTMLElement} dropdownIcon - The icon element representing the dropdown state
 * @returns {void}
 */
function closedDropdown(mainTagElt, dropdownIcon) {
    const dropdownContent = mainTagElt.querySelector(".filter_container");
    dropdownContent.classList.remove("open");
    dropdownIcon.classList.remove("fa-chevron-up", "dropdown-icon-up");
    dropdownIcon.classList.add("fa-chevron-down", "dropdown-icon-down");
}

/**
 * Opens the dropdown menu of the main tag element.
 *
 * @function openedDropdown
 * @param {HTMLElement} mainTagElt - The main tag element containing the dropdown menu
 * @param {HTMLElement} dropdownIcon - The icon element representing the dropdown state
 * @returns {void}
 */
function openedDropdown(mainTagElt, dropdownIcon) {
    mainTagElt.querySelector(".filter_container").classList.add("open");
    dropdownIcon.classList.add("fa-chevron-up", "dropdown-icon-up");
    dropdownIcon.classList.remove("fa-chevron-down", "dropdown-icon-down");
}

/**
 * Listens for input events on the main tag element and filters the tag list accordingly.
 *
 * @function inputTagSearch
 * @param {Array<string>} tags - An array of tag strings to be filtered
 * @param {HTMLElement} mainTagElt - The main tag element to listen for input events
 * @param {Array<string>} tagList - The original list of tags
 * @param {string} nameTag - The name of the tag being filtered
 * @returns {void}
 */
function inputTagSearch(tags, mainTagElt, tagList, nameTag) {
    mainTagElt.addEventListener("input", (event) => {
        const inputValue = event.target.value.trim().toLowerCase();
        // Filtre les tags en fonction de la valeur saisie
        const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(inputValue));
        createTagList(filteredTags, nameTag);
    });
}

/**
 * Adds selected tags to the tag container.
 *
 * @function addTag
 * @returns {void}
 */
export function addTag() {
    const tagContainer = document.querySelector(".tag_container");
    tagContainer.innerHTML = "";

    filtersList.forEach((filter) => {
        const selectedTag = document.createElement("div");
        selectedTag.textContent = filter;

        selectedTag.classList.add("selected_Tag", "fit-content", "rounded-md", "bg-chicky-yellow", "w-[210px]", "h-[300px]", "px-4", "py-2", "ml-10", "flex", "flex-row", "justify-between");

        const iconElement = document.createElement("span");
        iconElement.classList.add("fa-solid", "fa-xmark", "flex", "close_Icon");

        selectedTag.appendChild(iconElement);
        tagContainer.appendChild(selectedTag);

        iconElement.addEventListener("click", (e) => closeTag(e, filtersList));
    });
}

/**
 * Creates and appends a list of tags to the filter dropdown element.
 *
 * @function createTag
 * @param {Array} tags - An array of tags to be added to the list
 * @param {string} nameTag - The ID of the filter dropdown element
 * @returns {void}
 */
export function createTagList(tags, nameTag) {
    const unfilteredList = document.getElementById(`unfiltered_${nameTag}`);
    unfilteredList.classList.add("max-h-[250px]", "overflow-y-scroll", "scrollbar-thin", "scrollbar-thumb", "scrollbar-track", "opacity-10");
    unfilteredList.innerHTML = "";

    const filteredList = document.getElementById(`filtered_${nameTag}`);
    filteredList.classList.add("max-h-[250px]", "overflow-y-scroll", "scrollbar-thin", "scrollbar-thumb", "scrollbar-track", "opacity-10", "flex", "flex-col", "gap-1");
    filteredList.innerHTML = "";

    tags.forEach((tag) => {
        const tagElt = document.createElement("li");
        tagElt.textContent = tag;
        tagElt.classList.add("listElt", "text-capitalize", "text-nowrap");

        if (!filtersList.includes(tag)) {
            tagElt.classList.add("hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
            unfilteredList.appendChild(tagElt);

            tagElt.addEventListener("click", (e) => {
                if (!filtersList.includes(tag)) {
                    filtersList.push(tag);
                }
                addTag(filtersList);
                createTagList(tags, nameTag);
                filterUpdate();
            });
        } else {
            tagElt.classList.add("bg-chicky-yellow", "rounded", "px-2", "flex", "flex-row", "justify-between", "item-center");
            filteredList.appendChild(tagElt);

            const iconElt = document.createElement("i");
            iconElt.classList.add("fa-solid", "fa-xmark", "flex", "close_Icon", "pt-1", "pr-2");
            iconElt.addEventListener("click", (e) => closeTag(e, filtersList, true));
            tagElt.appendChild(iconElt);
        }
    });
}

/**
 * Removes the selected tag from the tag container.
 *
 * @function closeTag
 * @param {Event} e - The event object
 * @param {Array} filtersList - The list of selected filters
 * @returns {void}
 */
function closeTag(e, filtersList, allRecipes = false) {
    const iconElt = e.target;
    let selectedTagElt = iconElt.closest(".selected_Tag");

    if (!selectedTagElt) {
        selectedTagElt = iconElt.closest("li");
    }

    const tagText = selectedTagElt.textContent.trim();

    const index = filtersList.indexOf(tagText);
    if (index !== -1) {
        filtersList.splice(index, 1);
    }
    selectedTagElt.remove();
    filterUpdate(true);
    addTag();
}
export default { generateTagList };
