// Arrays to hold weapon materials and crafted weapons information
let craftedWeapons = [];

// Each object in this array represents a material with its name and quantity
let weaponMaterials = [
    { name: "Glavenus Hellshell", quantity: 50 },
    { name: "Glavenus Tailedge", quantity: 50 },
    { name: "Glavenus Mantle", quantity: 50 },
    { name: "Rathalos Shard", quantity: 50 },
    { name: "Rathalos Cortex", quantity: 50 },
    { name: "Rathalos Lash", quantity: 50 },
    { name: "Rathalos Gleam", quantity: 50 },
    { name: "Tigrex Hardfang", quantity: 50 },
    { name: "Tigrex Cortex", quantity: 50 },
    { name: "Vaal Hazak Hardclaw", quantity: 50 },
    { name: "Vaal Hazak Flail", quantity: 50 },
    { name: "Fulgur Anjanath Hardfang", quantity: 50 },
    { name: "Fulgur Anjanath Thickfur", quantity: 50 },
    { name: "Fulgur Anjanath Mantle", quantity: 50 }
];

// This array holds objects representing weapons and the materials required to craft them
let weapons = [
    {
        name: "Glavenus Blaze II",
        materials: [
            { name: "Glavenus Hellshell", quantity: 3 },
            { name: "Glavenus Tailedge", quantity: 2 },
            { name: "Glavenus Mantle", quantity: 1 }
        ]
    },
    {
        name: "Rathalos Gleamsword",
        materials: [
            { name: "Rathalos Shard", quantity: 8 },
            { name: "Rathalos Cortex", quantity: 4 },
            { name: "Rathalos Lash", quantity: 3 },
            { name: "Rathalos Gleam", quantity: 2 }
        ]
    },
    {
        name: "Tigrex Greatsword",
        materials: [
            { name: "Tigrex Hardfang", quantity: 2 },
            { name: "Tigrex Cortex", quantity: 4 }
        ]
    },
    {
        name: "Don Monstro",
        materials: [
            { name: "Vaal Hazak Hardclaw", quantity: 5 },
            { name: "Vaal Hazak Flail", quantity: 2 }
        ]
    },
    {
        name: "Fulguration's Edge",
        materials: [
            { name: "Fulgur Anjanath Hardfang", quantity: 3 },
            { name: "Fulgur Anjanath Thickfur", quantity: 5 },
            { name: "Fulgur Anjanath Mantle", quantity: 1 }
        ]
    }
];

// Event listener for changes in the weapon selection dropdown
document.getElementById('weapon-select').addEventListener('change', (event) => {
    const selectedWeaponName = event.target.value;
    adjustMaterialDropdowns(selectedWeaponName);
});

// Event listener for showing the weapon crafting area
document.getElementById('show-weapons').addEventListener('click', () => {
    document.getElementById('armor-crafting-message').textContent = '';
    document.getElementById('armor-recipe-display').style.display = 'none';
    const weaponArea = document.getElementById('weapons-crafting-area');
    const itemArea = document.getElementById('crafting-area');
    const recipeDisplay = document.getElementById('recipe-display');
    const weaponRecipeDisplay = document.getElementById('weapon-recipe-display');

    if (weaponArea.style.display === 'none') {
        weaponArea.style.display = 'block';
        itemArea.style.display = 'none';
        recipeDisplay.style.display = 'none';
        weaponRecipeDisplay.style.display = 'block';
        populateMaterialDropdowns();
        populateWeaponDropdown();
        populateWeaponRecipes();
    } else {
        weaponArea.style.display = 'none';
        weaponRecipeDisplay.style.display = 'none';
    }
});

// Event listener for showing the weapons inventory
document.getElementById('show-weapons-inventory').addEventListener('click', () => {
    const inventoryDisplay = document.getElementById('weapons-inventory-display');
    const button = document.getElementById('show-weapons-inventory');

    if (inventoryDisplay.style.display === 'block') {
        inventoryDisplay.style.display = 'none';
        button.textContent = 'Show Weapons Inventory';
    } else {
        updateWeaponsInventoryDisplay();
        inventoryDisplay.style.display = 'block';
        button.textContent = 'Hide Weapons Inventory';
    }
});

// Populates the weapon selection dropdown with available weapons
function populateWeaponDropdown() {
    const weaponSelect = document.getElementById('weapon-select');
    weaponSelect.innerHTML = '<option value="">Choose a weapon</option>';

    weapons.forEach(weapon => {
        let option = document.createElement('option');
        option.value = weapon.name;
        option.textContent = weapon.name;
        weaponSelect.appendChild(option);
    });
}

// Updates the display of the weapons inventory list
function updateWeaponsInventoryDisplay() {
    const inventoryList = document.getElementById('weapons-inventory-list');
    inventoryList.innerHTML = '';

    craftedWeapons.forEach(weapon => {
        const listItem = document.createElement('li');
        listItem.textContent = weapon.name;
        inventoryList.appendChild(listItem);
    });
}

// Populates material dropdowns with available materials
function populateMaterialDropdowns() {
    const materialDropdowns = [document.getElementById('material1'), document.getElementById('material2'), document.getElementById('material3'), document.getElementById('material4')];

    materialDropdowns.forEach(dropdown => {
        dropdown.innerHTML = '<option value="">Choose a material</option>';
        weaponMaterials.forEach(material => {
            dropdown.innerHTML += `<option value="${material.name}">${material.name}</option>`;
        });
    });
}

// Adjusts which material dropdowns are visible based on the selected weapon's requirements
function adjustMaterialDropdowns(weaponName) {
    const weapon = weapons.find(w => w.name === weaponName);
    if (!weapon) return;

    [document.getElementById('material1'), document.getElementById('material2'), document.getElementById('material3'), document.getElementById('material4')].forEach((dropdown, index) => {
        if (index < weapon.materials.length) {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    });
}

// Event listener for the craft weapon button
document.getElementById('craft-weapon').addEventListener('click', () => {
    const selectedWeaponName = document.getElementById('weapon-select').value;

    if (!selectedWeaponName) {
        document.getElementById('weapon-message').textContent = "Please select a weapon to craft.";
        return;
    }

    const weapon = weapons.find(w => w.name === selectedWeaponName);
    let canCraft = weapon && weapon.materials.every(material => {
        const materialDropdown = document.getElementById(`material${weapon.materials.indexOf(material) + 1}`);
        return materialDropdown.value === material.name && hasEnoughMaterials(material.name, material.quantity);
    });

    if (canCraft) {
        weapon.materials.forEach(material => {
            const materialInventory = weaponMaterials.find(m => m.name === material.name);
            if (materialInventory) {
                materialInventory.quantity -= material.quantity;
            }
        });
    
        craftedWeapons.push({ name: weapon.name });
        document.getElementById('weapon-message').textContent = `Crafted ${weapon.name}!`;
        updateWeaponsInventoryDisplay();
    } else {
        document.getElementById('weapon-message').textContent = "Cannot craft the weapon. Check the materials.";
    }
    
    populateMaterialDropdowns();
});

// Checks if there are enough materials available to craft the selected weapon
function hasEnoughMaterials(materialName, requiredQuantity) {
    const material = weaponMaterials.find(m => m.name === materialName);
    return material && material.quantity >= requiredQuantity;
}

// Populates the weapon recipes list showing what materials are needed for each weapon
function populateWeaponRecipes() {
    const recipeList = document.getElementById('weapon-recipe-list');
    recipeList.innerHTML = '';

    weapons.forEach(weapon => {
        const recipeElement = document.createElement('li');
        let materialsText = weapon.materials.map(material => `${material.quantity}x ${material.name}`).join(', ');
        recipeElement.textContent = `${weapon.name}: ${materialsText}`;
        recipeList.appendChild(recipeElement);
    });
}
