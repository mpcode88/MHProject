let items = [
    { "name": "Herb", "quantity": 50 },
    { "name": "Potion", "quantity": 50 },
    { "name": "Honey", "quantity": 50 },
    { "name": "Mega Potion", "quantity": 50 },
    { "name": "Max Potion", "quantity": 50 },
    { "name": "Ancient Potion", "quantity": 50 },
    { "name": "Lifepowder", "quantity": 50 },
    { "name": "Dust of Life", "quantity": 50 },
    { "name": "Herbal Powder", "quantity": 50 },
    { "name": "Energy Drink", "quantity": 50 },
    { "name": "Cool Drink", "quantity": 50 },
    { "name": "Hot Drink", "quantity": 50 },
    { "name": "Dash Juice", "quantity": 50 },
    { "name": "First-aid Med", "quantity": 50 },
    { "name": "First-aid Med+", "quantity": 50 },
    { "name": "Antidote Herb", "quantity": 50 },
    { "name": "Antidote", "quantity": 50 },
    { "name": "Blue Mushroom", "quantity": 50 },
    { "name": "Bitterbug", "quantity": 50 },
    { "name": "Nutrients", "quantity": 50 },
    { "name": "Mega Nutrients", "quantity": 50 },
    { "name": "Mandragora", "quantity": 50 },
    { "name": "Catalyst", "quantity": 50 },
    { "name": "Immunizer", "quantity": 50 },
    { "name": "Kelbi Horn", "quantity": 50 },
    { "name": "Nourishing Extract", "quantity": 50 },
    { "name": "Godbug", "quantity": 50 },
    { "name": "Gloamgrass Bud", "quantity": 50 },
    { "name": "Herbal Medicine", "quantity": 50 },
    { "name": "Nitroshroom", "quantity": 50 },
    { "name": "Chillshroom", "quantity": 50 },
    { "name": "Hot Pepper", "quantity": 50 },
    { "name": "Dash Extract", "quantity": 50 },
    { "name": "Might Seed", "quantity": 50 },
    { "name": "Demondrug", "quantity": 50 },
    { "name": "Mega Demondrug", "quantity": 50 },
    { "name": "Demon Powder", "quantity": 50 },
    { "name": "Might Pill", "quantity": 50 },
    { "name": "Adamant Seed", "quantity": 50 },
    { "name": "Armorskin", "quantity": 50 },
    { "name": "Mega Armorskin", "quantity": 50 },
    { "name": "Hardshell Powder", "quantity": 50 },
    { "name": "Adamant Pill", "quantity": 50 },
];

let itemRecipes = {
    "Herb": { result: "Potion", quantity: 1 },
    "Potion + Honey": { result: "Mega Potion", quantity: 1 },
    "First-aid Med + Honey": { result: "First-aid Med+", quantity: 1 },
    "Antidote Herb": { result: "Antidote", quantity: 1 },
    "Antidote + Blue Mushroom": { result: "Herbal Medicine", quantity: 1 },
    "Bitterbug + Blue Mushroom": { result: "Nutrients", quantity: 1 },
    "Nutrients + Honey": { result: "Mega Nutrients", quantity: 1 },
    "Mega Nutrients + Mandragora": { result: "Max Potion", quantity: 1 },
    "Bitterbug + Honey": { result: "Catalyst", quantity: 1 },
    "Catalyst + Mandragora": { result: "Immunizer", quantity: 1 },
    "Immunizer + Kelbi Horn": { result: "Ancient Potion", quantity: 1 },
    "Nourishing Extract + Kelbi Horn": { result: "Ancient Potion", quantity: 1 },
    "Godbug + Blue Mushroom": { result: "Lifepowder", quantity: 1 },
    "Godbug + Gloamgrass Bud": { result: "Dust of Life", quantity: 1 },
    "Godbug + Herbal Medicine": { result: "Herbal Powder", quantity: 1 },
    "Nitroshroom + Honey": { result: "Energy Drink", quantity: 1 },
    "Chillshroom": { result: "Cool Drink", quantity: 1 },
    "Hot Pepper": { result: "Hot Drink", quantity: 1 },
    "Catalyst + Dash Extract": { result: "Dash Juice", quantity: 1 },
    "Catalyst + Might Seed": { result: "Demondrug", quantity: 1 },
    "Nourishing Extract + Demondrug": { result: "Mega Demondrug", quantity: 1 },
    "Godbug + Might Seed": { result: "Demon Powder", quantity: 1 },
    "Immunizer + Might Seed": { result: "Might Pill", quantity: 1 },
    "Catalyst + Adamant Seed": { result: "Armorskin", quantity: 1 },
    "Nourishing Extract + Armorskin": { result: "Mega Armorskin", quantity: 1 },
    "Godbug + Adamant Seed": { result: "Hardshell Powder", quantity: 1 },
    "Immunizer + Adamant Seed": { result: "Adamant Pill", quantity: 1 },
};

// Event listener for showing the crafting area and populating dropdowns
document.getElementById('show-items').addEventListener('click', () => {
    document.getElementById('crafting-area').style.display = 'block';
    populateDropdowns();
    populateRecipes(); // Call this function to display recipes
});

function populateRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear existing recipes

    for (let recipe in itemRecipes) {
        if (itemRecipes.hasOwnProperty(recipe)) {
            const item = itemRecipes[recipe];
            const recipeElement = document.createElement('li');
            recipeElement.textContent = `${recipe} = ${item.result} (x${item.quantity})`;
            recipeList.appendChild(recipeElement);
        }
    }

    document.getElementById('recipe-display').style.display = 'block'; // Show the recipes
}


// Function to populate the dropdowns with items
function populateDropdowns() {
    const item1Select = document.getElementById('item1');
    const item2Select = document.getElementById('item2');

    // Clear existing options and add the default "Choose an item" option
    item1Select.innerHTML = '<option value="">Choose an item</option>';
    item2Select.innerHTML = '<option value="">Choose an item</option>';

    // Populate dropdowns with items
    items.forEach(item => {
        const option1 = document.createElement('option');
        option1.value = item.name;
        option1.textContent = item.name;
        item1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = item.name;
        option2.textContent = item.name;
        item2Select.appendChild(option2);
    });
}

document.getElementById('craft').addEventListener('click', () => {
    const item1 = document.getElementById('item1').value;
    const item2 = document.getElementById('item2').value;

    // Check if the user has selected valid items before crafting
    if (!item1 || !item2) {
        document.getElementById('message').textContent = "Please choose two items to craft.";
        return;
    }

    let crafted = false;
    for (let recipe in itemRecipes) {
        if (itemRecipes.hasOwnProperty(recipe)) {
            const ingredients = recipe.split(' + ');
            // Check if the recipe matches the selected items (for both single and multiple ingredient recipes)
            if ((ingredients.length === 1 && item1 === item2 && ingredients.includes(item1)) ||
                (ingredients.length > 1 && ingredients.includes(item1) && ingredients.includes(item2))) {
                const resultItem = itemRecipes[recipe].result;
                const quantity = itemRecipes[recipe].quantity;

                // Update inventory
                updateInventory(item1, item2, resultItem, quantity);
                crafted = true;
                document.getElementById('message').textContent = `Crafted ${quantity} ${resultItem}!`;
                // updateInventoryDisplay(); // Update and display the inventory after crafting
                break; // Exit the loop once a matching recipe is found and crafted
            }
        }
    }

    if (!crafted) {
        document.getElementById('message').textContent = "Crafting failed. These items can't be combined.";
    }

    populateDropdowns(); // Refresh dropdowns to reflect updated inventory
});

// Function to update the inventory
function updateInventory(item1, item2, resultItem, quantity) {
    // Decrease the quantity of used items if they are not the same
    if (item1 !== item2) {
        items.find(item => item.name === item1).quantity -= 1;
        items.find(item => item.name === item2).quantity -= 1;
    } else {
        items.find(item => item.name === item1).quantity -= 2;
    }

    // Add or update the crafted item in the inventory
    const existingItem = items.find(item => item.name === resultItem);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        items.push({ name: resultItem, quantity: quantity });
    }
}

// Function to update the inventory display
function updateInventoryDisplay() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear the list before updating

    items.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.name}: ${item.quantity}`;
        inventoryList.appendChild(itemElement);
    });

    document.getElementById('inventory-display').style.display = 'block'; // Show the inventory list
}

// Event listener for the 'Show Inventory' button
document.getElementById('show-inventory').addEventListener('click', () => {
    const inventoryDisplay = document.getElementById('inventory-display');
    const button = document.getElementById('show-inventory');

    // Toggle the display of the inventory and update button text based on current state
    if (inventoryDisplay.style.display === 'block') {
        inventoryDisplay.style.display = 'none';
        button.textContent = 'Show Inventory';
    } else {
        updateInventoryDisplay(); // Make sure the inventory is updated before showing it
        inventoryDisplay.style.display = 'block';
        button.textContent = 'Hide Inventory';
    }
});
