/**
 * Create and append a list of tags to the filter dropdown element.
 *
 * @param {Array} tags - an array of tags to be added to the list
 * @param {string} nameTag - the id of the filter dropdown element
 * @return {void}
 */
export default function createTag(tags, nameTag) {
    let filterDropdown = document.querySelector(`#${nameTag} .filter_container`);
    let tagList = document.createElement("ul");
    tagList.classList.add("tag_list", "h-[250px]", "overflow-y-scroll", "scrollbar-thin", "scrollbar-thumb", "scrollbar-track", "opacity-10");

    tags.forEach((tag) => {
        let tagElt = document.createElement("li");
        tagElt.textContent = tag;
        tagElt.classList.add("listElt", "text-capitalize", "text-nowrap", "hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
        tagList.appendChild(tagElt);
    });

    filterDropdown.appendChild(tagList);
}
