//Fonction pour créer un élément
export const createElement = (element) => document.createElement(element);
//Fonction pour ajouter un/les enfant(s) DOM au parent DOM
export const appendElement = (parent, elements) => {
    elements.forEach((element) => {
        parent.append(element);
    });
};
//Fonction pour ajouter un attribut et sa valeur à un élément du DOM
export const setAttribute = (element, attribute, value = '') => {
    element.setAttribute(attribute, value);
};
//Fonction pour récupérer un composant
export const querySelector = (element) => document.querySelector(element);

//Fonction pour attribuer plusieurs classes
export const classAdd = (element, classes) => {
    classes.forEach((classe) => {
        element.classList.add(classe);
    });
};