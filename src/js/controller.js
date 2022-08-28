import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');
///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;

    resultsView.renderSpinner();
    console.log(resultsView);

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.upgradeServings(newServings);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};

init();
// controlRecipes();
// controlSearchResults();
// console.log(recipeContainer);

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// await model.loadRecipe(id);

// try {

// } catch (err) {
//   alert(err);
// }

// class RecipeView {
//   #parentElement = document.querySelector('.recipe');
//   #data;

//   render(data) {
//     this.#data = data;
//     const markup = this.#generateMarkup;
//     recipeContainer.innerHTML = '';
//     recipeContainer.insertAdjecentHTML('afterbegin', markup);
//     this.#clear();
//     fa
//   }
// }

// export default new RecipeView();

// // publisher subscriber pattern

// addHandlerRender(handler) {
//   ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
// }

// const init = function () {
//   RecipeView.addHandlerRender(controlRecipes);
// };

// export const loadSearchResults = async function (query) {
//   try {
//     const data = await getJSON(`${API_URL}?search=${query}`);
//   } catch (err) {
//     throw err;
//   }
// }

// class SearchView {
//   #parent;
// }

// export class View {

// }

// _generateMarkcup() {
//   return `
//   `;
// }

// #pagination
