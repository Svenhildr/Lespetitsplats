export default function mainFilter(recipes) {
    const mainSearchbar = document.getElementById("searchbar");
    const mainSearchButton = document.querySelector("main_search_button");

    console.log(recipes);

    mainSearchbar.addEventListener("input", (event) => {
        event.preventDefault();

        if (mainSearchbar.value.length >= 3) {
            console.log(mainSearchbar.value);
            const cards = document.querySelectorAll(".card");
            eltFilter(mainSearchbar.value, cards);
        }
    });
}

function eltFilter(letters, elts) {
    const searchTermLower = letters.toLowerCase();
    for (let i = 0; i < elts.length; i++) {
        if (elts[i].textContent.toLowerCase().includes(searchTermLower)) {
            elts[i].style.display = "block";
        } else {
            elts[i].style.display = "none";
        }
    }
}
