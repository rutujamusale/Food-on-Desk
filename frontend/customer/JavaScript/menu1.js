// Function to fetch menu categories from Spring Boot backend
async function fetchMenuCategories() {
    try {
    const response = await fetch('http://localhost:8081/getAllMenuCatagories'); // Assuming your Spring Boot backend endpoint is '/getAllMenuCatagories'
    if (!response.ok) {
        throw new Error('Failed to fetch menu categories');
    }
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('Error fetching menu categories:', error);
    return [];
    }
}

// Function to dynamically generate filter cards from fetched data
async function generateFilterCards() {
    var menuContain = document.getElementById("menu-contain");
    
    // Fetch menu categories
    const menuCategories = await fetchMenuCategories();

    menuCategories.forEach(function(category) {
    var filterCard = document.createElement("div");
    filterCard.classList.add("filter-card");
    filterCard.setAttribute("onclick", "filterSelection('" + category.categoryName + "')");

    var filterIcon = document.createElement("div");
    filterIcon.classList.add("filter-icon");

    var img = document.createElement("img");
    img.src = `data:image/*;base64,${category.catImage}`;
    img.alt = category.categoryName;

    filterIcon.appendChild(img);
    filterCard.appendChild(filterIcon);

    var p = document.createElement("h5");
    p.textContent = category.categoryName;
    filterCard.appendChild(p);

    menuContain.appendChild(filterCard);
    });
}

// Call the function to generate filter cards
generateFilterCards();



// =============================== get all kind of menu items ======================
async function fetchMenuItems() {
    try {
        const response = await fetch('http://localhost:8081/get-all-menuItems');
        if (!response.ok) {
            throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        return [];
    }
}

async function generateMenuCards() {
    const menuItems = await fetchMenuItems();
    const container = document.getElementById("container");

    menuItems.forEach(function(menuItem) {
        container.appendChild(createCard(menuItem));
    });
}

function createCard(menuItem) {
    var mainDetailDiv = document.createElement("div");
    mainDetailDiv.classList.add("main-detail");
  
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
  
    var imgContainerDiv = document.createElement("div");
    imgContainerDiv.classList.add("card-img-container");
  
    var img = document.createElement("img");
    img.src = `data:image/*;base64,${menuItem.itemImage}`; // Assuming itemImage contains base64-encoded image data
    img.alt = menuItem.itemName;
  
    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
  
    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = menuItem.itemName;

    var cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text", "description");
    cardDescription.textContent = menuItem.description;

    var cardText = document.createElement("h4");
    cardText.classList.add("card-text");
    cardText.textContent =  "₹" + menuItem.itemPrice;
  
    var addButton = document.createElement("a");
    addButton.href = "#";
    addButton.classList.add("btn", "btn-primary");
    addButton.textContent = "Add";
  
    imgContainerDiv.appendChild(img);
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardDescription);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(addButton);
  
    cardDiv.appendChild(imgContainerDiv);
    cardDiv.appendChild(cardBodyDiv);
  
    mainDetailDiv.appendChild(cardDiv);
  
    return mainDetailDiv;
}

generateMenuCards();

//==============================================================
