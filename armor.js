// Array to store crafted armor sets
let craftedArmor = [];

// Array to store available materials for crafting armor
let armorMaterials = [
    { name: "Glavenus Cortex", quantity: 50 },
    { name: "Glavenus Hardfang", quantity: 50 },
    { name: "Glavenus Hellshell", quantity: 50 },
    { name: "Glavenus Mantle", quantity: 50 },
    { name: "Glavenus Tailedge", quantity: 50 },
    { name: "Rathalos Cortex", quantity: 50 },
    { name: "Rathalos Fellwing", quantity: 50 },
    { name: "Rathalos Lash", quantity: 50 },
    { name: "Rathalos Mantle", quantity: 50 },
    { name: "Rathalos Shard", quantity: 50 },
    { name: "Rathalos Wingtalon", quantity: 50 },
    { name: "Rathalos Medulla", quantity: 50 },
    { name: "Tigrex Cortex", quantity: 50 },
    { name: "Tigrex Hardclaw", quantity: 50 },
    { name: "Tigrex Lash", quantity: 50 },
    { name: "Tigrex Hardfang", quantity: 50 },
    { name: "Tigrex Shard", quantity: 50 },
    { name: "Vaal Hazak Cortex", quantity: 50 },
    { name: "Vaal Hazak Hardclaw", quantity: 50 },
    { name: "Vaal Hazak Fellwing", quantity: 50 },
    { name: "Vaal Hazak Flail", quantity: 50 },
    { name: "Fulgur Anjanath Thickfur", quantity: 50 },
    { name: "Fulgur Anjanath Shard", quantity: 50 },
    { name: "Fulgur Anjanath Lash", quantity: 50 },
    { name: "Heavy Fulgur Anjanath Nosebone", quantity: 50 },
    { name: "Fulgur Anjanath Hardfang", quantity: 50 },
    { name: "Fulgur Anjanath Mantle", quantity: 50 },
];

// Array to store armor sets and their required materials for crafting
let armor = [
    { 
        name: "Glavenus Armor Set", 
        requiredMaterials: [
            { name: "Glavenus Cortex", quantity: 10 },
            { name: "Glavenus Hardfang", quantity: 4 },
            { name: "Glavenus Hellshell", quantity: 5 },
            { name: "Glavenus Mantle", quantity: 1 },
            { name: "Glavenus Tailedge", quantity: 1 }
        ], 
        quantity: 1 
    },
    { 
        name: "Rathalos Armor Set", 
        requiredMaterials: [
            { name: "Rathalos Cortex", quantity: 10 },
            { name: "Rathalos Fellwing", quantity: 4 },
            { name: "Rathalos Lash", quantity: 2 },
            { name: "Rathalos Mantle", quantity: 1 },
            { name: "Rathalos Shard", quantity: 7 },
            { name: "Rathalos Wingtalon", quantity: 2 },
            { name: "Rathalos Medulla", quantity: 2 }
        ], 
        quantity: 1 
    },
    { 
        name: "Tigrex Armor Set", 
        requiredMaterials: [
            { name: "Tigrex Cortex", quantity: 10 },
            { name: "Tigrex Hardclaw", quantity: 5 },
            { name: "Tigrex Lash", quantity: 1 },
            { name: "Tigrex Hardfang", quantity: 4 },
            { name: "Tigrex Shard", quantity: 4 }
        ], 
        quantity: 1 
    },
    { 
        name: "Vaal Hazak Armor Set", 
        requiredMaterials: [
            { name: "Vaal Hazak Cortex", quantity: 15 },
            { name: "Vaal Hazak Hardclaw", quantity: 3 },
            { name: "Vaal Hazak Fellwing", quantity: 6 },
            { name: "Vaal Hazak Flail", quantity: 1 }
        ], 
        quantity: 1 
    },
    { 
        name: "Fulgar Anjanath Armor Set", 
        requiredMaterials: [
            { name: "Fulgur Anjanath Thickfur", quantity: 15 },
            { name: "Fulgur Anjanath Shard", quantity: 8 },
            { name: "Fulgur Anjanath Lash", quantity: 1 },
            { name: "Heavy Fulgur Anjanath Nosebone", quantity: 3 },
            { name: "Fulgur Anjanath Hardfang", quantity: 4 },
            { name: "Fulgur Anjanath Mantle", quantity: 1 }
        ], 
        quantity: 1 
    },
];

// Event listener for the "Armor Smithy" button to toggle the display of the armor crafting area
document.getElementById('show-armor-smithy').addEventListener('click', () => {
    const armorSmithyArea = document.getElementById('armor-smithy-area');
    const armorRecipeDisplay = document.getElementById('armor-recipe-display');

    if (armorSmithyArea.style.display === 'none') {
        armorSmithyArea.style.display = 'block';
        armorRecipeDisplay.style.display = 'block';
        populateArmorSelect();
        populateArmorRecipes();
    } else {
        armorSmithyArea.style.display = 'none';
        armorRecipeDisplay.style.display = 'none';
    }
});

// Event listener for the "Show Armor Inventory" button to toggle the display of the armor inventory
document.getElementById('show-armor-inventory').addEventListener('click', () => {
    const inventoryDisplay = document.getElementById('armor-inventory-display');
    inventoryDisplay.style.display = inventoryDisplay.style.display === 'none' ? 'block' : 'none';
    updateArmorInventoryDisplay();
    document.getElementById('armor-crafting-message').textContent = '';
});

// Function to populate the armor set selection dropdown
function populateArmorSelect() {
    const armorSelect = document.getElementById('armor-select');
    armorSelect.innerHTML = '<option value="">Choose an armor set</option>';
    armor.forEach(set => {
        const option = document.createElement('option');
        option.value = set.name;
        option.textContent = set.name;
        armorSelect.appendChild(option);
    });
}

// Function to adjust which material dropdowns are displayed based on the selected armor set
function adjustArmorMaterialsDropdowns(armorSetName) {
    const armorSet = armor.find(set => set.name === armorSetName);
    if (!armorSet) return;

    for (let i = 1; i <= 7; i++) {
        const materialDropdown = document.getElementById(`armor-material${i}`);
        if (i <= armorSet.requiredMaterials.length) {
            populateMaterialDropdown(materialDropdown, armorSet.requiredMaterials[i - 1]);
            materialDropdown.style.display = 'block';
        } else {
            materialDropdown.style.display = 'none';
        }
    }
}

// Event listener for changing the selected armor set to update material dropdowns
document.getElementById('armor-select').addEventListener('change', (event) => {
    adjustArmorMaterialsDropdowns(event.target.value);
});

// Event listener for the "Craft Armor" button to attempt crafting the selected armor set
document.getElementById('craft-armor').addEventListener('click', () => {
    const selectedArmorSet = armor.find(set => set.name === document.getElementById('armor-select').value);
    if (!selectedArmorSet) {
        alert('Please select an armor set to craft.');
        return;
    }

    const canCraft = selectedArmorSet.requiredMaterials.every((material, index) => {
        const materialDropdown = document.getElementById(`armor-material${index + 1}`);
        return materialDropdown.value === material.name && hasEnoughMaterials(material.name, material.quantity);
    });

    if (canCraft) {
        craftedArmor.push(selectedArmorSet);
        document.getElementById('armor-crafting-message').textContent = `Crafted ${selectedArmorSet.name}!`;
        updateArmorInventoryDisplay();
    } else {
        document.getElementById('armor-crafting-message').textContent = "Cannot craft the armor set. Check the materials.";
    }
});

// Function to update the display of the armor inventory
function updateArmorInventoryDisplay() {
    const inventoryList = document.getElementById('armor-inventory-list');
    inventoryList.innerHTML = '';
    craftedArmor.forEach(set => {
        const listItem = document.createElement('li');
        listItem.textContent = set.name;
        inventoryList.appendChild(listItem);
    });
}

// Function to populate a material dropdown
function populateMaterialDropdown(dropdown, material) {
    dropdown.innerHTML = '<option value="">Choose a material</option>';
    armorMaterials.forEach(mat => {
        const option = document.createElement('option');
        option.value = mat.name;
        option.textContent = mat.name;
        dropdown.appendChild(option);
    });
}

// Function to check if enough materials are available for crafting
function hasEnoughMaterials(materialName, requiredQuantity) {
    const material = armorMaterials.find(m => m.name === materialName);
    return material && material.quantity >= requiredQuantity;
}

// Function to populate the armor crafting recipes display
function populateArmorRecipes() {
    const recipeList = document.getElementById('armor-recipe-list');
    recipeList.innerHTML = '';

    armor.forEach(set => {
        const recipeElement = document.createElement('li');
        let materialsText = set.requiredMaterials.map(material => `${material.quantity}x ${material.name}`).join(', ');
        recipeElement.textContent = `${set.name}: ${materialsText}`;
        recipeList.appendChild(recipeElement);
    });
}
