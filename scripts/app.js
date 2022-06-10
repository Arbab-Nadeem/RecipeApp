let recipes = getSavedRecipes();
let filters = '';
let filteredRecipes = filterRecipes(recipes, filters);

loadMainPage();

const searchText = document.getElementById('search-text');
const addBtn = document.getElementById('add-recipe-btn');

searchText.addEventListener('input', function (event) {
	filters = searchText.value.toLowerCase();
	filteredRecipes = filterRecipes(recipes, filters);
	renderFilteredRecipes(filteredRecipes);
});

addBtn.addEventListener('click', () => {
	const id = uuidv4();
	window.location.assign(`../add-recipe.html#${id}`);
});

window.addEventListener('storage', (event) => {
	if (event.key === 'recipes') {
		recipes = JSON.parse(event.newValue);
		renderFilteredRecipes(filteredRecipes);
	}
});
