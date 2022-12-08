import { recipes } from './recipes.js';
console.log(recipes[0].name);
const ingredients = [];
recipes.forEach((Recipe) => {
    Recipe.ingredients.forEach((Ingredient) => {
        ingredients.push(Ingredient.ingredient);
    })

});
const unique = Array.from(new Set(ingredients));
console.log(unique);
const select = document.querySelector("#select_button");
const selectIcon = document.querySelector(".chevron-down");
selectIcon.style.animationPlayState = 'paused';
select.addEventListener("click", (e) => {
    const selectParent = select.parentElement;
    select.style.display = "none";
    const selectText = document.createElement("input");
    selectText.type = "text";
    selectText.classList.add("select_text");
    selectText.placeholder = "Rechercher un ingrédient";
    select.parentNode.insertBefore(selectText, selectIcon);
    selectParent.style.width = "667px";
    selectIcon.style.position = "relative";
    selectIcon.style.right = "-164px";
    selectParent.style.transition = "width 1s";
    selectIcon.style.animationPlayState = 'running';
    selectParent.style.borderRadius = "0px";
    selectParent.style.borderTopLeftRadius = "5px";
    selectParent.style.borderTopRightRadius = "5px";
    const ingre_options = document.querySelector(".ingre_options");
    ingre_options.style.display = "grid";
    selectText.focus();
})