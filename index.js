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
//Fonction pour faire le rendu
const render = (word =' ')=>{
    //galerie.innerHTML = "";
    word = word.trim().toLowerCase();
    const filtered = filterData(word);
    generer_carte(filtered);
}
//Fonction pour filtrer les données suivant un string
const filterData = (word) =>{
    return recipes.filter(
        (item)=>
        item.name.toLowerCase().includes(word)||
        item.description.toLowerCase().includes(word)||
        item.ingredients.map((ingr)=>{ ingr.ingredient.toLowerCase()}).includes(word)
    );
}
//Fonction pour générer les carte de recette en suivant un array
const generer_carte = (donnees) => {
    galerie.innerHTML = "";
    donnees.forEach((recipe)=>{
        //génération de la carte
        const recipe_card = createElement('div');
        classAdd(recipe_card, ['recipe_card']);
        const recipe_img = createElement('div');
        classAdd(recipe_img, ['recipe_img']);
        const recipe_info = createElement('div');
        classAdd(recipe_info, ['recipe_info']);
        const recipe_title = createElement('span');
        classAdd(recipe_title, ['recipe_title']);
        recipe_title.id = "Test";
        recipe_title.innerText = recipe.name;
        const recipe_info_up = createElement('div');
        classAdd(recipe_info_up, ['recipe_info_up_time']);
        const time_icon = createElement('i');
        classAdd(time_icon, ["recipe_time_icon", "fa-regular", "fa-clock"]);
        const time_quantite = createElement('span');
        time_quantite.innerText = `${recipe.time} min`;
        classAdd(time_quantite, ['recipe_time']);
        appendElement(recipe_info_up, [time_icon, time_quantite]);
        const recipe_info_down = createElement("div");
        classAdd(recipe_info_down, ['recipe_info_down_ingr']);
        recipe.ingredients.forEach((ingr)=>{
            const leIngredient = createElement('div');
            classAdd(leIngredient, ['ingredient']);
            const ingredient = createElement("span");
            let ingr_unit = ' ';
            let ingr_quantity = ' ';
            const ingr_name = createElement('span');
            ingr_name.innerText = `${ingr.ingredient}: `;
            ingr_name.style.fontWeight = "bold";
            ingr_name.style.marginRight = "5px";
            if(ingr.quantity != undefined && ingr.quantity != null){ingr_quantity = ingr.quantity}
            if(ingr.unit != undefined && ingr.unit != null){ingr_unit = ingr.unit}
            switch(ingr_unit){
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
        appendElement(recipe_desc, [recipe_desc_text]);
        appendElement(recipe_info, [recipe_title, recipe_info_up, recipe_info_down, recipe_desc]);
        appendElement(recipe_card, [recipe_img, recipe_info]);
        appendElement(galerie, [recipe_card]);
        //filterOptionsAppa()
    })
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
            for (let i = 0; i < 6; i++) {
                const option = createElement("p");
                option.innerText = uniqueIngredients[i];
                appendElement(options, [option]);
                //console.log(options.childNodes);
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
            for (let i = 0; i < uniqueAppareils.length; i++) {
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
            for (let i = 0; i < uniqueUstensiles.length; i++) {
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
    }else{
        if(valeur.length < 3){
            if(galerie_content != undefined && galerie_content != null && galerie_content != document.querySelectorAll('.recipe_card')){
                //generer_carte(recipes);
            }
        }
    }
})
function filterOptionsIngre(word){
    const ArrayTest = Array.from(querySelector('.ingre_options').childNodes);
    const filtered = ArrayTest.filter(function(item){
        return item.innerText.split(' ').includes(word);
    })
    if(filtered != undefined || filtered != null){
        querySelector('.ingre_options').innerHTML = '';
        filtered.forEach((option)=>{
            const uneOption = createElement("p");
            uneOption.innerText = option.innerText;
            appendElement(querySelector('.appa_options'), [uneOption]);
        })
    }
}
filterOptionsIngre("coco");

function filterOptionsAppa(){
    //console.log(document.querySelector("#ingredients_select"));
    //const ArrayTest = Array.from(querySelector('.appa_options').childNodes);
    
    const ArrayTest2 = Array.from(document.querySelectorAll(".recipe_card"));
    const ArrayTest3 = ArrayTest2.map(function (item){
        return item.lastChild.firstChild.innerText;
    })
    const Test4 = recipes.filter(function (recipe){
        return ArrayTest3.includes(recipe.name)
    })
    if(Test4.length != recipes.length){
        const Test5 = Test4.map(function(recipe){
            return recipe.appliance;
        })
        const Test6 = Array.from(new Set(Test5));
        console.log(Test6)
    }
}