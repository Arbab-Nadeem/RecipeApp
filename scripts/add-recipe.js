let recipes = getSavedRecipes();

const recipe = {
	id: '',
	name: '',
	description: '',
	ingredients: [],
};

const addIngredient = document.getElementById('add-ingredient');

addIngredient.addEventListener('submit', (event) => {
	event.preventDefault();
	addIngredients(event, recipe.ingredients);
	event.target.elements.ingredient.value = '';
	renderIngredients(recipe.ingredients);
});

const saveRecipe = document.getElementById('save-recipe');

saveRecipe.addEventListener('click', () => {
	const recipeName = document.getElementById('recipe-name');
	const recipeDescription = document.getElementById('recipe-description');

	let timestamp = moment().valueOf();
	recipe.id = window.location.hash.substring(1);
	if (recipeName.value.length === 0) {
		recipe.name = 'unnamed recipe';
	} else {
		recipe.name = recipeName.value;
		recipe.updatedAt = timestamp;
	}
	recipe.description = recipeDescription.value;
	recipes.push(recipe);
	saveRecipes(recipes);
	window.location.assign('../index.html');
});

window.addEventListener('storage', (event) => {
	if (event.key === 'recipes') {
		recipes = JSON.parse(event.newValue);
		renderFilteredRecipes(filteredRecipes);
	}
});
