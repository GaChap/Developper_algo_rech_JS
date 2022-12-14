//import { createElement } from '../Front-End-Fisheye/scripts/factories/domElement.mjs';
import { recipes } from './recipes.js';
//Fonctions
//Fonction pour générer les "tag" automatiquement
function generer_tag(type, value) {
    const tagChosen = document.createElement("div");
    tagChosen.classList.add("tag_chosen");
    const tagChosenText = document.createElement("span");
    tagChosenText.innerText = value;
    const tagChosenMark = document.createElement("i")
    tagChosenMark.classList.add("fa-regular");
    tagChosenMark.classList.add("fa-circle-xmark");
    //Suppression du tag quand X cliqué
    tagChosenMark.addEventListener("click", (e) => {
        tagChosen.remove();
    })
    //Switch pour la couleur de fond
    switch (type) {
        case 'Ingrédients': tagChosen.classList.add(`ingre`);
            break
        case 'Appareils': tagChosen.classList.add(`appa`);
            break
        case 'Ustensiles': tagChosen.classList.add(`usten`);
            break
    }
    //Switch pour la longueur du tag
    switch (value.length) {
        case 9: tagChosen.style.width = "115px";
            break
        case 12: tagChosen.style.width = "130px";
            break
        case 13: tagChosen.style.width = "150px";
            break
        case 14: tagChosen.style.width = "145px";
            break
        case 16: tagChosen.style.width = "155px";
            break
        case 21: tagChosen.style.width = "200px";
            break
    }
    tagChosen.append(tagChosenText);
    tagChosen.append(tagChosenMark);
    document.querySelector("#tag_chosen").append(tagChosen);
}

//Processus pour supprimer les doublons
const ingredients = [];
const appareils = [];
const ustensiles = [];
recipes.forEach((Recipe) => {
    appareils.push(Recipe.appliance);
    Recipe.ingredients.forEach((Ingredient) => {
        ingredients.push(Ingredient.ingredient);
    })
    Recipe.ustensils.forEach((Ustensil) => {
        ustensiles.push(Ustensil);
    })
});
const uniqueIngredients = Array.from(new Set(ingredients));
const uniqueAppareils = Array.from(new Set(appareils));
const uniqueUstensiles = Array.from(new Set(ustensiles));
let n = 0;
//Debut génération select
for (let i = 0; i < 3; i++) {
    const container = document.createElement("div");
    container.classList.add("container");
    const selecteur = document.createElement("div");
    selecteur.classList.add("select");
    selecteur.classList.add("select_div");
    const select_button = document.createElement("input");
    select_button.type = "button";
    select_button.classList.add("select_button");
    const selectorIcon = document.createElement("i");
    selectorIcon.classList.add("fa-solid");
    selectorIcon.classList.add("fa-chevron-down");
    selectorIcon.classList.add("chevron-down");
    selectorIcon.style.animationPlayState = 'paused';
    const options = document.createElement("div");
    options.classList.add("options");
    //Switch pour générer les options selon le type
    switch (i) {
        case 0: select_button.value = "Ingrédients";
            selecteur.id = "ingredients_select";
            options.classList.add("ingre_options");
            for (let i = 0; i < 6; i++) {
                const option = document.createElement("p");
                option.innerText = uniqueIngredients[i];
                options.append(option);
                option.addEventListener('click', (e) => {
                    generer_tag(select_button.value, option.innerText);
                })
            }
            break
        case 1: select_button.value = "Appareils";
            selecteur.id = "appareils_select";
            options.classList.add("appa_options");
            for (let i = 0; i < 6; i++) {
                const option = document.createElement("p");
                option.innerText = uniqueAppareils[i];
                options.append(option);
                option.addEventListener('click', (e) => {
                    generer_tag(select_button.value, option.innerText);
                })
            }
            break
        case 2: select_button.value = "Ustensiles";
            selecteur.id = "ustensiles_select";
            options.classList.add("ust_options");
            for (let i = 0; i < 6; i++) {
                const option = document.createElement("p");
                option.innerText = uniqueUstensiles[i];
                options.append(option);
                option.addEventListener('click', (e) => {
                    generer_tag(select_button.value, option.innerText);
                })
            }
            break
    }
    //Appends
    selecteur.append(select_button);
    selecteur.append(selectorIcon);
    container.append(selecteur);
    container.append(options);
    document.querySelector(".search_tag").append(container);
    //Création du champ de texte
    const selectText = document.createElement("input");
    selectText.type = "text";
    selectText.classList.add("select_text");
    selectText.placeholder = "Rechercher un ingrédient";
    select_button.addEventListener('click', (e) => {
        select_button.style.display = "none";
        options.style.display = "grid";
        //Insertion du champ de texte si inexistant
        if (selecteur.contains(selectText) == false) {
            selecteur.insertBefore(selectText, selectorIcon);
        }
        //Si existant affichage
        if (n > 0) {
            if (selecteur.children[1] != selectorIcon) {
                selecteur.children[1].style.display = "inline";
            }
            selectorIcon.classList.remove("chevron-down2");
            selectorIcon.classList.add("chevron-down");
        }
        container.parentElement.style.width = "80%";
        //Style du selecteur
        selecteur.style.width = "667px";
        selectorIcon.style.position = "relative";
        selectorIcon.style.right = "-164px";
        selecteur.style.transition = "width 1s";
        selectorIcon.style.animationPlayState = 'running';
        selecteur.style.borderRadius = "0px";
        selecteur.style.borderTopLeftRadius = "5px";
        selecteur.style.borderTopRightRadius = "5px";
        selecteur.children[1].focus();
        if (n == 0) {
            n++
        }
    })
    //Pour "fermer" le sélecteur
    document.querySelector(".main_container").addEventListener("click", (e) => {
        if (!e.target.closest(".search_tag") && n != 0) {
            if (selecteur.children[1] != selectorIcon) {
                selecteur.children[1].style.display = "none";
            }
            container.parentElement.style.width = "575px";
            select_button.style.display = "inline";
            options.style.display = "none";
            selecteur.style.borderRadius = "5px";
            selecteur.style.borderBottomLeftRadius = "5px";
            selecteur.style.borderBottomRightRadius = "5px";
            if (selectorIcon.style.right == "-164px") {
                selectorIcon.classList.remove("chevron-down");
                selectorIcon.classList.add("chevron-down2");
            }
            selecteur.style.width = "170px";
        }
    })
}
//Fin génération select