// let recipeId = window.location.hash.substring(1);

//  Save Recipes to local storage
const saveRecipes = (recipes) => {
	localStorage.setItem('recipes', JSON.stringify(recipes));
};
// Get saved Recipes from local storage.
const getSavedRecipes = () => {
	const recipeJSON = localStorage.getItem('recipes');
	try {
		return recipeJSON ? JSON.parse(recipeJSON) : [];
	} catch (err) {
		return [];
	}
};

const findRecipe = (recipes, recipeId) => {
	const recipe = recipes.find(function (element) {
		return element.id === recipeId;
	});
	return recipe;
};

const deleteRecipe = (recipes, recipeId) => {
	const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId);
	if (recipeIndex > -1) {
		recipes.splice(recipeIndex, 1);
	}
};

// remove recipe

const addIngredients = (event, arr) => {
	const ingredientId = uuidv4();
	arr.push({
		id: ingredientId,
		name: event.target.elements.ingredient.value,
		status: false,
	});
};

const renderIngredients = (ingredients) => {
	const ingredientSection = document.getElementById('ingredients-section');
	ingredientSection.textContent = '';

	ingredients.forEach((ingredient) => {
		const ingredientEl = document.createElement('p');
		const ingredientName = document.createElement('span');
		const removeIngredient = document.createElement('button');
		const checkbox = document.createElement('input');

		checkbox.setAttribute('type', 'checkbox');
		checkbox.classList.add('checkbox');

		checkbox.checked = ingredient.status;

		checkbox.addEventListener('change', (event) => {
			ingredient.status = event.target.checked;
			saveRecipes(recipes);
		});

		ingredientEl.appendChild(checkbox);

		if (ingredient.name.length === 0) {
			ingredientName.textContent = 'empty';
		} else {
			ingredientName.textContent = ingredient.name;
		}
		ingredientName.classList.add('text-element');
		ingredientEl.appendChild(ingredientName);

		removeIngredient.innerHTML = 'remove';
		removeIngredient.classList.add('remove-element');

		removeIngredient.addEventListener('click', () => {
			deleteIngredient(ingredients, ingredient);
			renderIngredients(ingredients);
		});
		ingredientEl.appendChild(removeIngredient);
		ingredientSection.appendChild(ingredientEl);
	});
};

const deleteIngredient = (ingredients, item) => {
	const ingredientIndex = ingredients.findIndex(
		(ingredient) => ingredient.id === item.id
	);
	ingredients.splice(ingredientIndex, 1);
};

const calculateStatus = (recipe) => {
	let count = 0;
	let numberOfIngredients = recipe.ingredients.length;
	recipe.ingredients.forEach((ingredient) => {
		if (ingredient.status === true) {
			count++;
		}
	});
	if (count === 0) {
		return 'You have <span> none </span> of the ingredients';
	} else if (count === numberOfIngredients) {
		return 'You have <span> all </span> ingredients';
	} else {
		return 'You have <span> some </span> of the ingredients';
	}
};

const filterRecipes = (recipes, filters) => {
	return recipes.filter((recipe) =>
		recipe.name.toLowerCase().includes(filters)
	);
};
const renderFilteredRecipes = (filteredRecipes) => {
	const recipeEl = document.getElementById('recipeEl');
	recipeEl.innerHTML = '';
	filteredRecipes.forEach(renderMainPageRecipes);
};

// render Recipes function
const renderRecipe = (recipe) => {
	const recipeName = document.getElementById('recipe-name');
	const recipeDescription = document.getElementById('recipe-description');
	const lastEdited = document.getElementById('lastEdited');
	recipeName.value = recipe.name;
	recipeDescription.value = recipe.description;
	lastEdited.innerHTML = generateLastEdited(recipe.updatedAt);
	renderIngredients(recipe.ingredients);
};

const loadMainPage = () => {
	const loadRecipes = getSavedRecipes();
	if (loadRecipes.length === 0) {
		const recipeContainer = document.getElementById('recipeEl');
		const paragraph = document.createElement('h3');
		paragraph.innerHTML = 'No recipes to show';
		paragraph.classList.add('text-outer-space');
		recipeContainer.appendChild(paragraph);
	} else {
		loadRecipes.forEach(renderMainPageRecipes);
	}
};

const renderMainPageRecipes = (recipe) => {
	const recipeContainer = document.getElementById('recipeEl');
	const recipeLink = document.createElement('a');
	const recipeTitle = document.createElement('p');
	const summary = document.createElement('p');
	const removeButton = document.createElement('button');

	recipeTitle.textContent = recipe.name;

	recipeLink.appendChild(recipeTitle);
	recipeLink.classList.add('list-item');
	recipeLink.setAttribute('href', `../edit-recipe.html#${recipe.id}`);

	let status = calculateStatus(recipe);
	summary.classList.add('list-item__title');
	summary.innerHTML = status;

	removeButton.textContent = 'remove';
	removeButton.classList.add('button--text');

	removeButton.addEventListener('click', () => {
		removeRecipe(recipe.id);
		saveRecipes(recipes);
		recipeLink.setAttribute('href', '../index.html');
	});

	recipeLink.appendChild(recipeTitle);
	recipeLink.appendChild(removeButton);
	recipeLink.style.textDecoration = 'none';

	recipeContainer.appendChild(recipeLink);
	recipeContainer.appendChild(summary);
};

const generateLastEdited = () => {
	let timestamp = moment().valueOf();
	return `Last Edited: ${moment(timestamp).fromNow()}`;
	// return `Last Edited: ${moment(recipe.updatedAt).fromNow()}`;
};

const removeRecipe = (id) => {
	const findIndex = recipes.findIndex((recipe) => recipe.id === id);
	if (findIndex > -1) {
		recipes.splice(findIndex, 1);
	}
};
