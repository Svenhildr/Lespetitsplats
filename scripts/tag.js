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

export function initTag(tags, nameTag, fullTagList) {
    let mainTagElt = document.querySelector(`#${nameTag}`);
    createTag(tags, nameTag);
    toggleDropdown(mainTagElt);
    selectTag(mainTagElt, fullTagList);
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

function selectTag(mainTagElt, fullTagList) {
    let tags = mainTagElt.querySelectorAll("li");

    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
            console.log(tag.textContent);
            const tagText = tag.textContent.trim();
            if (tagText) {
                addTag(tagText);
                const index = fullTagList.indexOf(tagText);
                if (index !== -1) {
                    fullTagList.splice(index, 1);
                    updateTagList(mainTagElt, fullTagList);
                }
                // tag.remove();
            }
        });
    });
}

function closeTag(e, fullTagList) {
    console.log(e.target);
    const iconElt = e.target;
    const selectedTagElt = iconElt.closest(".selected_Tag");
    selectedTagElt.remove();
    const tagText = selectedTagElt.textContent.trim();
    if (tagText) {
        fullTagList.push(tagText);
        updateTagList(mainTagElt, fullTagList);
        selectedTagElt.remove();
    }
}

function updateTagList(container, tagText) {
    const tagList = container.querySelector(".tag_list");
    const newTagElt = document.createElement("li");
    newTagElt.textContent = tagText;
    newTagElt.classList.add("text-capitalize", "text-nowrap", "hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
    tagList.appendChild(newTagElt);
}

export function addTag(tagText, fullTagList) {
    const selectedTag = document.createElement("div");
    const tagContainer = document.querySelector(".tag_container");
    selectedTag.textContent = tagText;

    selectedTag.classList.add("selected_Tag", "fit-content", "rounded-md", "bg-chicky-yellow", "w-[210px]", "h-[300px]", "px-4", "py-2", "ml-10", "flex", "flex-row", "justify-between");
    const iconElement = document.createElement("i");
    iconElement.classList.add("fa-solid", "fa-xmark", "flex", "close_Icon");

    selectedTag.appendChild(iconElement);
    tagContainer.appendChild(selectedTag);

    iconElement.addEventListener("click", (e) => closeTag(e, fullTagList));
}
export default { generateTagList };
