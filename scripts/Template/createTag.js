// import { addTag } from "../tag.js";

// /**
//  * Create and append a list of tags to the filter dropdown element.
//  *
//  * @param {Array} tags - an array of tags to be added to the list
//  * @param {string} nameTag - the id of the filter dropdown element
//  * @return {void}
//  */
// export default function createTag(tags, nameTag, filtersList) {
//     const unfilteredList = document.getElementById(`unfiltered_${nameTag}`);
//     unfilteredList.classList.add("h-[250px]", "overflow-y-scroll", "scrollbar-thin", "scrollbar-thumb", "scrollbar-track", "opacity-10");

//     const filteredList = document.getElementById(`filtered_${nameTag}`);
//     filteredList.classList.add("h-[250px]", "overflow-y-scroll", "scrollbar-thin", "scrollbar-thumb", "scrollbar-track", "opacity-10");

//     tags.forEach((tag) => {
//         const tagElt = document.createElement("li");
//         tagElt.textContent = tag;
//         tagElt.classList.add("listElt", "text-capitalize", "text-nowrap");
//         if (!filtersList.includes(tag)) {
//             tagElt.classList.add("hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
//             unfilteredList.appendChild(tagElt);
//             tagElt.addEventListener("click", (e) => {
//                 if (!filtersList.includes(tag)) {
//                     filtersList.push(tag);
//                 }
//                 console.log(filtersList);
//                 addTag(filtersList);
//             });
//         } else {
//             tagElt.classList.add("bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
//             filteredList.appendChild(tagElt);
//         }
//     });

//     /*     let filterDropdown = document.querySelector(`#${nameTag} .filter_container`);
//     let tagList = document.createElement("ul");
//     tagList.classList.add("tag_list", "h-[250px]", "overflow-y-scroll", "scrollbar-thin", "scrollbar-thumb", "scrollbar-track", "opacity-10");

//     tags.forEach((tag) => {
//         let tagElt = document.createElement("li");
//         tagElt.textContent = tag;
//         tagElt.classList.add("listElt", "text-capitalize", "text-nowrap", "hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
//         tagList.appendChild(tagElt);
//     });

//     filterDropdown.appendChild(tagList); */
// }

/*     let filterDropdown = document.querySelector(`#${nameTag} .filter_container`);
    let tagList = document.createElement("ul");
    tagList.classList.add("tag_list", "h-[250px]", "overflow-y-scroll", "scrollbar-thin", "scrollbar-thumb", "scrollbar-track", "opacity-10");

    tags.forEach((tag) => {
        let tagElt = document.createElement("li");
        tagElt.textContent = tag;
        tagElt.classList.add("listElt", "text-capitalize", "text-nowrap", "hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
        tagList.appendChild(tagElt);
    });

    filterDropdown.appendChild(tagList); */

/* function updateTagList(container, tagText) {
    const tagList = container.querySelector(".tag_list");
    if (tagList) {
        const newTagElt = document.createElement("li");
        newTagElt.textContent = tagText;
        newTagElt.classList.add("text-capitalize", "text-nowrap", "hover:bg-chicky-yellow", "ease-in-out", "duration-200", "rounded", "px-2");
        tagList.appendChild(newTagElt);
    } else {
        console.log("error tagList");
    }
} */

/*  let tags = mainTagElt.querySelectorAll("li");

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
                tag.classList.add("bg-chicky-yellow", "flex", "flex-row", "justify-between", "content-center");
                const iconElement = document.createElement("i");
                iconElement.classList.add("fa-solid", "fa-xmark", "flex", "close_Icon");
                tag.appendChild(iconElement);
            }
        });
    }); */
