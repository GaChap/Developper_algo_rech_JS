import { createElement, querySelector, appendElement, classAdd } from './domElement.mjs';
import { recipes } from './recipes.js';
//Fonctions
//Fonction pour générer les "tag" automatiquement
function generer_tag(type, value) {
    const tagChosen = createElement("div");
    classAdd(tagChosen, ["tag_chosen"]);
    const tagChosenText = createElement("span");
    tagChosenText.innerText = value;
    const tagChosenMark = createElement("i")
    classAdd(tagChosenMark, ["fa-regular", "fa-circle-xmark"]);
    //Suppression du tag quand X cliqué
    tagChosenMark.addEventListener("click", (e) => {
        tagChosen.remove();
    })
    //Switch pour la couleur de fond
    switch (type) {
        case 'Ingrédients': classAdd(tagChosen, ['ingre']);
            break
        case 'Appareils': classAdd(tagChosen, ['appa']);
            break
        case 'Ustensiles': classAdd(tagChosen, ['usten']);
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
    appendElement(tagChosen, [tagChosenText, tagChosenMark]);
    appendElement(querySelector("#tag_chosen"), [tagChosen]);
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
    const container = createElement("div");
    classAdd(container, ["container"]);
    const selecteur = createElement("div");
    classAdd(selecteur, ["select", "select_div"]);
    const select_button = createElement("input");
    select_button.type = "button";
    select_button.classList.add("select_button");
    const selectorIcon = createElement("i");
    classAdd(selectorIcon, ["fa-solid", "fa-chevron-down", "chevron-down"]);
    selectorIcon.style.animationPlayState = 'paused';
    const options = createElement("div");
    classAdd(options, ["options"]);
    //Switch pour générer les options selon le type
    switch (i) {
        case 0: select_button.value = "Ingrédients";
            selecteur.id = "ingredients_select";
            classAdd(options, ["ingre_options"]);
            for (let i = 0; i < 6; i++) {
                const option = createElement("p");
                option.innerText = uniqueIngredients[i];
                appendElement(options, [option]);
                option.addEventListener('click', (e) => {
                    if (option.classList.contains("active") == false) {
                        classAdd(option, ["active"]);
                        generer_tag(select_button.value, option.innerText);
                    }
                })
            }
            break
        case 1: select_button.value = "Appareils";
            selecteur.id = "appareils_select";
            classAdd(options, ["appa_options"]);
            for (let i = 0; i < 6; i++) {
                const option = createElement("p");
                option.innerText = uniqueAppareils[i];
                appendElement(options, [option]);
                option.addEventListener('click', (e) => {
                    generer_tag(select_button.value, option.innerText);
                })
            }
            break
        case 2: select_button.value = "Ustensiles";
            selecteur.id = "ustensiles_select";
            classAdd(options, ["ust_options"]);
            for (let i = 0; i < 6; i++) {
                const option = createElement("p");
                option.innerText = uniqueUstensiles[i];
                appendElement(options, [option]);
                option.addEventListener('click', (e) => {
                    generer_tag(select_button.value, option.innerText);
                })
            }
            break
    }
    //Appends
    appendElement(selecteur, [select_button, selectorIcon]);
    appendElement(container, [selecteur, options]);
    appendElement(querySelector(".search_tag"), [container]);
    //Création du champ de texte
    const selectText = createElement("input");
    selectText.type = "text";
    classAdd(selectText, ["select_text"]);
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
            classAdd(selectorIcon, ["chevron-down"]);
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
    querySelector(".main_container").addEventListener("click", (e) => {
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
                classAdd(selectorIcon, ["chevron-down2"])
            }
            selecteur.style.width = "170px";
        }
    })
}
//Fin génération select
//console.log(Array.from("Test"));
querySelector("#search_princip").addEventListener("input", (e) => {
    const valeur = querySelector("#search_princip").value.toLowerCase();
    const valueArray = Array.from(valeur);
    const idxTrouv = [];
    const titres = [];
    let monTitre = [];
    const test = "lol";
    let trouv = 0;
    if (valeur.length >= 3) {
        //const testRecipes = recipes.map(recipe => recipe.name.toLowerCase());
        //debut recherche 
        for (let i = 0; i < recipes.length; i++) {
            titres.push(recipes[i].name.toLowerCase());
            const titreAct = titres[i].split(" ");
            titreAct.forEach((titre) => {
                if (titre == valeur) {
                    idxTrouv.push(i);
                }
            })
        }
    }
    console.log(idxTrouv);
})  