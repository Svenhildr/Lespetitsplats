const ingredientTags = generateTagList(recipes)[0]; //liste des ingrédients
const applianceTags = generateTagList(recipes)[1]; //liste des appareils
const ustensilsTags = generateTagList(recipes)[2]; //liste des  ustensils
let filtersList = []; //liste des filtres
// import createTag from "./Template/createTag.js";
// import { inputTagSearch } from "./Template/search.js";

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
export function initTags() {
    initTag(ingredientTags, "ingredients");
    initTag(applianceTags, "appliances");
    initTag(ustensilsTags, "ustensils");
}
export function initTag(tags, nameTag) {
    let mainTagElt = document.querySelector(`#${nameTag}`);
    createTag(tags, nameTag);
    toggleDropdown(mainTagElt);
    inputTagSearch(tags, mainTagElt, tags, nameTag);
}

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

function closedDropdown(mainTagElt, dropdownIcon) {
    const dropdownContent = mainTagElt.querySelector(".filter_container");
    dropdownContent.classList.remove("open");
    dropdownIcon.classList.remove("fa-chevron-up", "dropdown-icon-up");
    dropdownIcon.classList.add("fa-chevron-down", "dropdown-icon-down");
}

function openedDropdown(mainTagElt, dropdownIcon) {
    mainTagElt.querySelector(".filter_container").classList.add("open");
    dropdownIcon.classList.add("fa-chevron-up", "dropdown-icon-up");
    dropdownIcon.classList.remove("fa-chevron-down", "dropdown-icon-down");
}

// function selectTag(mainTagElt, fullTagList) {}

function closeTag(e, fullTagList) {
    console.log(e.target);
    const iconElt = e.target;
    const selectedTagElt = iconElt.closest(".selected_Tag");
    selectedTagElt.remove();
    const tagText = selectedTagElt.textContent.trim();
    if (tagText) {
        fullTagList.push(tagText);
        // updateTagList(mainTagElt, fullTagList);
        selectedTagElt.remove();
    }
}

function filteredTagList(mainTagElt, filteredTags) {
    console.log(mainTagElt, filteredTags);
    // Clear the existing tag list
    // mainTagElt.innerHTML = "";

    // Create new tag elements for each filtered tag and append them to the tag list container
    filteredTags.forEach((tagText) => {
        const newTagElt = document.createElement("li");
        newTagElt.textContent = tagText;
        newTagElt.classList.add("text-capitalize", "text-nowrap", "hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
        mainTagElt.appendChild(newTagElt);
    });
}

function inputTagSearch(tags, mainTagElt, tagList, nameTag) {
    mainTagElt.addEventListener("input", (event) => {
        const inputValue = event.target.value.trim().toLowerCase();
        const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(inputValue));
        // updateTagList(tagList, filteredTags);
        filteredTagList(mainTagElt, filteredTags);
    });
}

export function addTag() {
    const tagContainer = document.querySelector(".tag_container");
    tagContainer.innerHTML = "";

    filtersList.forEach((filter) => {
        const selectedTag = document.createElement("div");
        selectedTag.textContent = filter;

        selectedTag.classList.add("selected_Tag", "fit-content", "rounded-md", "bg-chicky-yellow", "w-[210px]", "h-[300px]", "px-4", "py-2", "ml-10", "flex", "flex-row", "justify-between");
        const iconElement = document.createElement("i");
        iconElement.classList.add("fa-solid", "fa-xmark", "flex", "close_Icon");

        selectedTag.appendChild(iconElement);
        tagContainer.appendChild(selectedTag);

        iconElement.addEventListener("click", (e) => closeTag(e, filtersList));
    });
}

/**
 * Create and append a list of tags to the filter dropdown element.
 *
 * @param {Array} tags - an array of tags to be added to the list
 * @param {string} nameTag - the id of the filter dropdown element
 * @return {void}
 */
export function createTag(tags, nameTag) {
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
                console.log(filtersList);
                addTag(filtersList);
                createTag(tags, nameTag);
            });
        } else {
            tagElt.classList.add("bg-chicky-yellow", "rounded", "px-2");
            filteredList.appendChild(tagElt);
        }
    });
}

export default { generateTagList };
