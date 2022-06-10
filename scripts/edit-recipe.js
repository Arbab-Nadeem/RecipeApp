recipes = getSavedRecipes();
const recipeId = window.location.hash.substring(1);
const addIngredient = document.getElementById('add-ingredient');
const updateBtn = document.getElementById('update-recipe');
const deleteBtn = document.getElementById('delete-recipe-btn');

const recipe = findRecipe(recipes, recipeId);

if (recipe === undefined) {
	location.assign('./index.html');
}
renderRecipe(recipe);

addIngredient.addEventListener('submit', (event) => {
	event.preventDefault();
	addIngredients(event, recipe.ingredients);
	event.target.elements.ingredient.value = '';
	renderIngredients(recipe.ingredients);
});

deleteBtn.addEventListener('click', () => {
	const confirmation = confirm('Are you sure to delete this recipe?');
	if (confirmation) {
		deleteRecipe(recipes, recipe.id);
		window.location.assign('../index.html');
		saveRecipes(recipes);
	}
});

updateBtn.addEventListener('click', () => {
	const recipeName = document.getElementById('recipe-name');
	const recipeDescription = document.getElementById('recipe-description');
	recipe.id = window.location.hash.substring(1);

	recipe.name = recipeName.value;
	recipe.description = recipeDescription.value;
	recipe.status = true;
	saveRecipes(recipes);
	window.location.assign('../index.html');
});

window.addEventListener('storage', (event) => {
	const recipeName = document.getElementById('recipe-name');
	const recipeDescription = document.getElementById('recipe-description');
	const lastEdited = document.getElementById('lastEdited');

	if (event.key === 'recipes') {
		recipes = JSON.parse(event.newValue);
		const recipe = findRecipe(recipes, recipeId);
		console.log('click');
		if (!recipe) {
			window.location.assign('../index.html');
		} else {
			recipeName.value = recipe.name;
			recipeDescription.value = recipe.description;
			lastEdited.innerHTML = generateLastEdited(recipe.updatedAt);
		}
	}
});
