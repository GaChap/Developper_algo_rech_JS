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
        //Suppression de la classe "active"
        const tagText = e.target.parentElement.innerText
        const optionsIngre = Array.from(document.querySelector(".ingre_options").childNodes)
        const optionsAppa = Array.from(document.querySelector(".appa_options").childNodes)
        const optionsUst = Array.from(document.querySelector(".ust_options").childNodes)
        let trouve = false;
        if (trouve == false) {
            for (let i = 0; i < optionsIngre.length; i++) {
                if (optionsIngre[i].classList[0] == "active" && optionsIngre[i].innerText == tagText) {
                    optionsIngre[i].classList.remove("active");
                    trouve = true;
                }
            }
            for (let i = 0; i < optionsAppa.length; i++) {
                if (optionsAppa[i].classList[0] == "active" && optionsAppa[i].innerText == tagText) {
                    optionsAppa[i].classList.remove("active");
                    trouve = true;
                }
            }
            for (let i = 0; i < optionsUst.length; i++) {
                if (optionsUst[i].classList[0] == "active" && optionsUst[i].innerText == tagText) {
                    optionsUst[i].classList.remove("active");
                    trouve = true;
                }
            }
        }
        //Regénération des cartes
        tagFilter();
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
    tagFilter();
}
//Fonction pour faire le rendu
const render = (word = ' ') => {
    galerie.innerHTML = "";
    word = word.trim().toLowerCase();
    const filtered = filterData(word);
    generer_carte(filtered);
    filterOptionsAppaUst();
    filterOptionsIngre(filtered);
}
//Fonction pour filtrer les données suivant un string
const filterData = (word) => {
    return recipes.filter(
        (item) =>
            item.name.toLowerCase().includes(word) ||
            item.description.toLowerCase().includes(word) ||
            item.ingredients.map((ingr) => { ingr.ingredient.toLowerCase() }).includes(word)
    );
}
//Fonction pour générer les carte de recette en suivant un array
const generer_carte = (donnees) => {
    galerie.innerHTML = "";
    donnees.forEach((recipe) => {
        //génération de la carte
        const recipe_card = createElement('div');
        classAdd(recipe_card, ['recipe_card']);
        const recipe_img = createElement('div');
        classAdd(recipe_img, ['recipe_img']);
        const recipe_info = createElement('div');
        classAdd(recipe_info, ['recipe_info']);
        const recipe_title = createElement('span');
        classAdd(recipe_title, ['recipe_title']);
        //Gérer les noms à rallonge
        const recipe_title2 = createElement("span");
        classAdd(recipe_title2, ['recipe_title2']);
        recipe_title2.innerText = "";
        if (recipe.name.length >= 32) {
            const Test1 = recipe.name.split(" ");
            let Test2 = "";
            let Test3 = "";
            for (let i = 0; i < Test1.length; i++) {
                if (i < 4) {
                    Test2 += " " + Test1[i];
                } else {
                    if (i => 4) {
                        Test3 += " " + Test1[i];
                    }
                }
            }
            recipe_title.innerText = Test2;
            recipe_title2.innerText = Test3;
        }
        else { recipe_title.innerText = recipe.name; }
        const recipe_info_up = createElement('div');
        classAdd(recipe_info_up, ['recipe_info_up_time']);
        const time_icon = createElement('i');
        classAdd(time_icon, ["recipe_time_icon", "fa-regular", "fa-clock"]);
        const time_quantite = createElement('span');
        //Surélever le temps au niveau de la première ligne de nom
        if (recipe_title2.innerText != "") {
            time_icon.style.top = "-27px";
            time_quantite.style.top = "-27px";
        }
        time_quantite.innerText = `${recipe.time} min`;
        classAdd(time_quantite, ['recipe_time']);
        appendElement(recipe_info_up, [time_icon, time_quantite]);
        const recipe_info_down = createElement("div");
        classAdd(recipe_info_down, ['recipe_info_down_ingr']);
        recipe.ingredients.forEach((ingr) => {
            const leIngredient = createElement('div');
            classAdd(leIngredient, ['ingredient']);
            const ingredient = createElement("span");
            let ingr_unit = ' ';
            let ingr_quantity = ' ';
            const ingr_name = createElement('span');
            ingr_name.innerText = `${ingr.ingredient}: `;
            ingr_name.style.fontWeight = "bold";
            ingr_name.style.marginRight = "5px";
            if (ingr.quantity != undefined && ingr.quantity != null) { ingr_quantity = ingr.quantity }
            if (ingr.unit != undefined && ingr.unit != null) { ingr_unit = ingr.unit }
            switch (ingr_unit) {
                case 'cuillères à soupe': ingr_unit = 'cuill. soupe';
                    break
                case 'cuillères à café': ingr_unit = 'cuill. café';
                    break
                case 'grammes': ingr_unit = 'g';
                    break
            }
            ingredient.innerText = ` ${ingr_quantity} ${ingr_unit}`;
            appendElement(leIngredient, [ingr_name, ingredient]);
            appendElement(recipe_info_down, [leIngredient]);
        })
        const recipe_desc = createElement('div');
        classAdd(recipe_desc, ['recipe_descript']);
        const recipe_desc_text = createElement("p");
        recipe_desc_text.innerText = recipe.description;
        classAdd(recipe_desc_text, ['recipe_descript_text']);
        appendElement(recipe_desc, [recipe_desc_text]);//Test
        if (recipe_title2 != undefined && recipe_title2 != null) {
            appendElement(recipe_info, [recipe_title, recipe_title2, recipe_info_up, recipe_info_down, recipe_desc]);
        } else {
            appendElement(recipe_info, [recipe_title, recipe_info_up, recipe_info_down, recipe_desc]);
        }
        appendElement(recipe_card, [recipe_img, recipe_info]);
        appendElement(galerie, [recipe_card]);
    })
}
//console.log(document.getElementsByTagName("span"));

function ClickOption(value, option) {
    option.addEventListener('click', (e) => {
        if (option.classList.contains("active") == false) {
            classAdd(option, ["active"]);
            generer_tag(value, option.innerText);
        }
    })
}
//Recherche par les tags
function tagFilter() {
    //Récupère tous les tags
    const tags = document.querySelectorAll(".tag_chosen")
    let tagIngre = [];
    let tagAppa = [];
    let tagUst = [];
    let resultIngre = false;
    let resultAppa = false;
    let resultUst = false;
    //Selon la 2nde classe répartit les tags dans les tableaux correspondant
    for (let i = 0; i < tags.length; i++) {
        switch (tags[i].classList[1]) {
            case 'ingre': tagIngre = [...tagIngre, tags[i].innerText];
                break
            case 'appa': tagAppa = [...tagAppa, tags[i].innerText];
                break
            case 'usten': tagUst = [...tagUst, tags[i].innerText];
                break
        }
    }
    //Recherche effective
    const recipesArray = recipes.filter(function (recipe) {
        //Par Appareil
        resultAppa = tagAppa.every(function (item) {
            return item == recipe.appliance;
        });
        //Par Ustensile(s)
        resultUst = tagUst.every((item) => { return recipe.ustensils.includes(item) })
        //Par Ingrédient(s)
        resultIngre = tagIngre.every((item) => {
            const ingrNames = recipe.ingredients.map((ingr) => { return ingr.ingredient })
            return ingrNames.includes(item);
        })
        //Affectation de la recette correspondant à la recherche
        if (resultUst && resultAppa && resultIngre) {
            return true;
        }
    })
    //Affichage du résultat de la recherche
    //console.log(recipesArray);
    //Génération du résultat
    if (recipesArray != undefined && recipesArray != null) {
        generer_carte(recipesArray);
    }
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
const galerie = querySelector('#galerie');
generer_carte(recipes);
const galerie_content = document.querySelectorAll('.recipe_card');
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
            for (let i = 0; i < uniqueIngredients.length; i++) {
                const option = createElement("p");
                option.innerText = uniqueIngredients[i];
                appendElement(options, [option]);
                ClickOption(select_button.value, option);
            }
            break
        case 1: select_button.value = "Appareils";
            selecteur.id = "appareils_select";
            classAdd(options, ["appa_options"]);
            for (let i = 0; i < uniqueAppareils.length; i++) {
                const option = createElement("p");
                option.innerText = uniqueAppareils[i];
                appendElement(options, [option]);
                ClickOption(select_button.value, option);
            }
            break
        case 2: select_button.value = "Ustensiles";
            selecteur.id = "ustensiles_select";
            classAdd(options, ["ust_options"]);
            for (let i = 0; i < uniqueUstensiles.length; i++) {
                const option = createElement("p");
                option.innerText = uniqueUstensiles[i];
                appendElement(options, [option]);
                ClickOption(select_button.value, option);
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
        if (!e.target.closest(".container") && n != 0) {
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
        render(valeur);

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
            /*const ingrArray = item.ingredients.map(function(ingr){
                ingr.ingredient.toLowerCase()
            }).split(' ').includes(valeur);*/
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
        //console.log(ResultRech);
        //console.log(filterData('coco'));
    } else {
        if (valeur.length < 3) {
            if (galerie_content != undefined && galerie_content != null && galerie_content != document.querySelectorAll('.recipe_card')) {
                //generer_carte(recipes);
            }
        }
    }
})
function filterOptionsIngre(filtered) {
    const testarray = filtered.map((recipe) => {
        return recipe.ingredients.map((ingr) => {
            return ingr.ingredient;
        });
    })
    const testarray2 = testarray.join(',').split(',')
    if (testarray2) {
        querySelector('.ingre_options').innerHTML = '';
        testarray2.forEach((option) => {
            const uneOption = createElement("p");
            uneOption.innerText = option;
            appendElement(querySelector('.ingre_options'), [uneOption]);
            ClickOption("Ingrédients", uneOption);
        })
    }
}
//Fonction pour filtrer appareils avec recettes restantes
function filterOptionsAppaUst() {
    const recipe_card_array = Array.from(document.querySelectorAll(".recipe_card"));
    const recipe_name_array = recipe_card_array.map(function (item) {
        return item.lastChild.firstChild.innerText;
    })
    const recipes_rest_array = recipes.filter(function (recipe) {
        return recipe_name_array.includes(recipe.name)
    })
    if (recipes_rest_array.length != recipes.length) {
        const recipe_appliance_array = recipes_rest_array.map(function (recipe) {
            return recipe.appliance;
        })
        const recipe_appliance = Array.from(new Set(recipe_appliance_array));
        if (recipe_appliance) {
            querySelector(".appa_options").innerHTML = "";
            recipe_appliance.forEach((appa) => {
                const option = createElement("p");
                option.innerText = appa;
                appendElement(querySelector(".appa_options"), [option]);
                ClickOption("Appareils", option);
            })
        }
        //ustensiles
        const recipe_ust_array = recipes_rest_array.map(function (recipe) {
            return recipe.ustensils;
        })
        const recipe_ust = recipe_ust_array.join(",").split(",");
        const recipe_ust_unique = Array.from(new Set(recipe_ust));
        if (recipe_ust_unique) {
            querySelector(".ust_options").innerHTML = "";
            recipe_ust_unique.forEach((ust) => {
                const option = createElement("p");
                option.innerText = ust;
                appendElement(querySelector(".ust_options"), [option]);
                ClickOption("Ustensiles", option);
            })
        }
    }
}