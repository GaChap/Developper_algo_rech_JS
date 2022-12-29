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
querySelector("#search_princip").addEventListener("input", (e) => {
    const valeur = querySelector("#search_princip").value.toLowerCase();
    if (valeur.length >= 3) {
        //Algorithme naïf titre
        const TestRecipName = recipes.filter(function (item2) {
            const nameArray = item2.name.split(' ');
            for (let i = 0; i < nameArray.length; i++) {
                if (nameArray[i].toLowerCase().slice(0, valeur.length) == valeur) {
                    return item2;
                }
            }
        })
        const TestRecipName2 = recipes.filter(function (item) {
            const nameArray = item.name.split(' ').map(function (item2) { return item2.toLowerCase() });
            return nameArray.includes(valeur);
        })
        //Algorithme naïf ingrédients
        const TestRecipIngr = recipes.filter(function (item) {
            const ingrArray = item.ingredients;
            for (let i = 0; i < ingrArray.length; i++) {
                const ingrNameArray = ingrArray[i].ingredient.split(' ');
                for (let i = 0; i < ingrNameArray.length; i++) {
                    if (ingrNameArray[i].toLowerCase().slice(0, valeur.length) == valeur) {
                        return true;
                    }
                }
            }
        })
        const TestRecipIngr2 = recipes.filter(function (item) {
            const ingrArray = item.ingredients;
            const ingrNameArray = ingrArray.map(function (ingr) {
                return ingr.ingredient.toLowerCase().split(' ');
            }).map(function (tableau) {
                if (tableau.includes(valeur)) {
                    return true;
                }
            })
            if (ingrNameArray.includes(true)) { return true };
        })
        //Algorithme naïf description
        const TestRecipDesc = recipes.filter(function (item) {
            const descArray = item.description.split(' ');
            for (let i = 0; i < descArray.length; i++) {
                if (descArray[i].toLowerCase().slice(0, valeur.length) == valeur) {
                    return true;
                }
            }
        });
        const regEx = /\s*[,\.\(\)]\s*/;
        const TestRecipDesc2 = recipes.filter(function (item) {
            const descArray = item.description.split(regEx).map(function (phrase) {
                return phrase.split(" ");
            }).map(function (motArray) {
                if (motArray.includes(valeur)) { return true; }
            });
            if (descArray.includes(true)) { return true }
            return descArray.includes(valeur);
        });
        const re = /\s*[,\.\(\)]\s*/;
        const TestMdr = "Manger, c'est, délicieux. Je vais me faire (péter le bide)";
        const testRT = [{ name: "test1" }, { name: "test2" }, { name: "test3" }]
        const TestLol = ["manger", "test", "boire"];
        //console.log([TestRecipDesc, TestRecipIngr, TestRecipName]);
        //console.log(TestMdr.split(re));
        let ObjectTab = [];
        if (TestRecipDesc != undefined || TestRecipIngr != undefined || TestRecipName != undefined) {
            let compte = [TestRecipDesc.length, TestRecipIngr.length, TestRecipName.length];
            compte.sort(function (a, b) {
                return a - b;
            })
            for (let i = 0; i < compte[compte.length - 1]; i++) {
                if (TestRecipDesc[i] != undefined && TestRecipDesc[i] != null) {
                    ObjectTab.push(TestRecipDesc[i]);
                }
                if (TestRecipIngr[i] != undefined && TestRecipDesc[i] != null) {
                    ObjectTab.push(TestRecipIngr[i]);
                }
                if (TestRecipName[i] != undefined && TestRecipDesc[i] != null) {
                    ObjectTab.push(TestRecipName[i]);
                }
            }
        }
        const ResultRech = Array.from(new Set(ObjectTab));
        console.log(ResultRech);
    }
})