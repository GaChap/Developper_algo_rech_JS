import { recipes } from './recipes.js';
//Processus pour supprimer les doublons
const ingredients = [];
recipes.forEach((Recipe) => {
    Recipe.ingredients.forEach((Ingredient) => {
        ingredients.push(Ingredient.ingredient);
    })

});
//Tous les ingrédients en exemplaire unique
const unique = Array.from(new Set(ingredients));
//console.log(unique);
//Gerer le premier selecteur custom
const select = document.querySelector("#select_button");
const selectIcon = document.querySelector(".chevron-down");
//Mettre l'animation en pause
selectIcon.style.animationPlayState = 'paused';
let n = 0;
select.addEventListener("click", (e) => {
    const selectParent = select.parentElement;
    select.style.display = "none";
    const ingre_options = document.querySelector(".ingre_options");
    ingre_options.style.display = "grid";
    if (n == 0) {
        //Création du champ de text
        const selectText = document.createElement("input");
        selectText.type = "text";
        selectText.classList.add("select_text");
        selectText.placeholder = "Rechercher un ingrédient";
        select.parentNode.insertBefore(selectText, selectIcon);
        //Création dynamique des options des ingrédients
        for (let i = 0; i < 6; i++) {
            const option = document.createElement("p");
            option.innerText = unique[i]
            ingre_options.append(option);
            //Création dynamique du tag
            option.addEventListener("click", (e) => {
                const tagChosen = document.createElement("div");
                tagChosen.classList.add("tag_chosen");
                tagChosen.classList.add("ingre");
                const tagChosenText = document.createElement("span");
                tagChosenText.innerText = option.innerText;
                const tagChosenMark = document.createElement("i")
                tagChosenMark.classList.add("fa-regular");
                tagChosenMark.classList.add("fa-circle-xmark");
                //Suppression du tag quand X cliqué
                tagChosenMark.addEventListener("click", (e) => {
                    tagChosen.remove();
                })
                tagChosen.append(tagChosenText);
                tagChosen.append(tagChosenMark)
                document.querySelector("#tag_chosen").append(tagChosen);
            })
        }
    }
    if (n > 0) {
        select.parentElement.children[1].style.display = "inline";
        selectIcon.classList.remove("chevron-down2");
        selectIcon.classList.add("chevron-down");
    }
    selectParent.style.width = "667px";
    selectIcon.style.position = "relative";
    selectIcon.style.right = "-164px";
    selectParent.style.transition = "width 1s";
    selectIcon.style.animationPlayState = 'running';
    selectParent.style.borderRadius = "0px";
    selectParent.style.borderTopLeftRadius = "5px";
    selectParent.style.borderTopRightRadius = "5px";
    select.parentElement.children[1].focus();
    n++
})

//Event listener pour "fermer" le selecteur
document.querySelector(".main_container").addEventListener("click", (e) => {
    if (!e.target.closest(".search_tag2") && n != 0) {
        select.parentElement.style.width = "170px";
        select.parentElement.children[1].style.display = "none";
        select.style.display = "inline";
        document.querySelector(".ingre_options").style.display = "none";
        select.parentElement.style.borderRadius = "5px";
        select.parentElement.style.borderBottomLeftRadius = "5px";
        select.parentElement.style.borderBottomRightRadius = "5px";
        /*if (document.querySelector(".chevron-down")) {
            //select.parentElement.removeChild(selectIcon);
        }*/
        selectIcon.classList.remove("chevron-down");
        selectIcon.classList.add("chevron-down2");
    }
})