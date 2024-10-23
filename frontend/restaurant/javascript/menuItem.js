// ===================== Search Bar for search Menu Item  =======================
$(document).ready(() => {
    $('#itemTable tbody').append(`<tr id="not-found" style="display: none;"><td style="color: red;" colspan='8' align='center'>Item Not Found!!</td></tr>`);

    $('.btn-search').click(function() {
        var searchTerm = $('#search').val().toLowerCase();
        var found = false;

        $('#itemTable tbody tr').each(function() {
            var rowText = $(this).find('td:eq(1), td:eq(2), td:eq(3)').text().toLowerCase();

            if (rowText.includes(searchTerm)) {
                $(this).show();
                found = true; //data found
            } else {
                $(this).hide();
            }
        });

        if (found) {
            $('#not-found').hide();
        } else {
            $('#not-found').show();
        }
    });

    // Add a keyup event listener to the search input field
    $('#search').keyup(function() {
        $('.btn-search').click();
    });
});


// show add new Item Form
document.getElementById("btn-add-item").addEventListener("click", function(){
    console.log("Button clicked");
    document.getElementById("newItem").style.display = "block";
});

// display prevue of selected image
let categoryPic = document.getElementById("item-pic");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function(){
    categoryPic.src = URL.createObjectURL(inputFile.files[0]);
}

// ============= add menu Item ================
$(document).ready(async function() {
    $("#saveMenuItemBtn").on('click', async function(event) {
        event.preventDefault();

        const itemName = $('#itemName').val();
        const itemPrice = $('#itemPrice').val();
        const itemType = $('#itemType').val();
        const description = $('#itemDescription').val();
        const itemImg = $('#input-file')[0].files[0];

        if(!itemName || !itemPrice){
            $(`#mssgAlert`).show();
            return;
        }else{
            $(`#mssgAlert`).hide();
        }

        if(!itemImg){
            $(`#imageAlert`).show();
            return;
        }else{
            $(`#imageAlert`).hide();
        }

        // const categoryId = 12;
                
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('categoryId');

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemPrice', itemPrice);
        formData.append('itemType', itemType);
        formData.append('description', description);
        formData.append('itemImg', itemImg);


        try {
            const response = await fetch(`http://localhost:8081/add-menuItem/${categoryId}`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert(`Item added Successfully`);
                location.reload();
            } else {
                console.error('Failed to add Menu Item:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding Menu Item:', error);
        }
    });
});


// Cancle add food item form
document.getElementById("cancleItemForm").addEventListener("click", function(){
    console.log("Button clicked");
    document.getElementById("newItem").style.display = "none";
});


// =============================== Show Food Menu Item =====================
$(document).ready(async function() {
    try {
        // extract the category id from the URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('categoryId');

        if (categoryId) {
            const itemUrl = `http://localhost:8081/get-menuItem-categoryId/${categoryId}`;
            const itemResponse = await fetch(itemUrl);

            if (itemResponse.ok) {
                const itemData = await itemResponse.json();
                    // Check if itemData array is empty
                    if (itemData.length === 0) {
                    // If no items, display a message
                    $(`#itemTable tbody`).append(`
                        <tr>
                            <td colspan="9" style="color: red">No items added in this category.</td>
                        </tr>
                    `);
                    } else {
                        itemData.forEach(function(item, index) {
                            const editForm = `
                                <tr id="edit-form-row-${item.itemId}" style="display: none;">
                                    <td colspan="8">
                                        <form class="edit-itemForm" id="edit-form-${item.itemId}">
                                            <div class="text-title">Update Item</div>
                                            
            
                                            <div class="input-field ">
                                                <label for="itemName-${item.itemId}">Item Name</label>
                                                <input type="text" id="itemName-${item.itemId}" value="${item.itemName}" required>
                                            </div>
                                            <div class="input-field ">
                                                <label for="itemPrice-${item.itemId}">Price</label>
                                                <input type="number" id="itemPrice-${item.itemId}" value="${item.itemPrice}" required>
                                            </div>
                                            <div class="input-field ">
                                                <label for="itemType-${item.itemId}">Food Type</label>
                                                <select id="itemType-${item.itemId}">
                                                <option value="veg" ${item.itemType === 'veg' ? 'selected' : ''}>Vegetarian</option>
                                                <option value="nonVeg" ${item.itemType === 'nonVeg' ? 'selected' : ''}>Non-Vegetarian</option>
                                                </select>
                                            </div>
                                            <div class="input-field ">
                                                <label for="itemDesc-${item.itemId}">Description</label>
                                                <input type="text" id="itemDesc-${item.itemId}" value="${item.description}">
                                            </div>
                                            <div class="input-field ">
                                            <img  src="data:image/*;base64, ${item.itemImage}" id="item-pic-${item.itemId}">
                                            <label class="selectImg" for="itemImage-${item.itemId}">Select Image</label>
                                            <input type="file" accept="image/*" id="itemImage-${item.itemId}" hidden/>
                                        </div>
                                            <div class="buttons">
                                                <button class="submit-btn button" onclick="updateMenuItem(${item.itemId})">Update</button>
                                                <button class="cancel-btn button" onclick="cancelEditForm(${item.itemId})">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                    </td>
                                </tr>
                            `;
                            $(`#itemTable tbody`).append(`
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.itemId}</td>
                                    <td>${item.itemName}</td>
                                    <td><img style="width:85px; border-radius:60%" src="data:image/*;base64, ${item.itemImage}" /></td>
                                    <td>${item.itemType}</td>
                                    <td style="color: var(--success)">&#8377;${item.itemPrice}</td>
                                    <td>${item.description}</td>
                                    <td><button class="bttn" id="edit-btn" onclick="showEditForm(${item.itemId})">Edit</button></td>
                                    <td><button class="bttn" id="delete-btn" onclick="deleteMenuItem(${item.itemId})">Delete</button></td>
                                </tr>
                                ${editForm}
                            `);
                        });
                    }
                console.log("Menu Item Data Loaded Successfully!");
            } else {
                console.error("Failed to fetch Menu Item data:", itemResponse.statusText);
            }
        } else {
            console.error("Category ID is missing from the URL.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});


// Hide and show edit form
function showEditForm(itemId) {
    $('[id^="edit-form-row-"]').hide();
    $(`#edit-form-row-${itemId}`).show();
}

function cancelEditForm(itemId) {
    $(`#edit-form-row-${itemId}`).hide();
}

// =============== Update Menu Item ================
async function updateMenuItem(itemId){
    const itemName = $(`#itemName-${itemId}`).val();
    const itemPrice = $(`#itemPrice-${itemId}`).val();
    const itemType = $(`#itemType-${itemId}`).val();
    const itemDesc = $(`#itemDesc-${itemId}`).val();
    const itemImage = $(`#itemImage-${itemId}`).prop('files')[0];

    const formData = new FormData();
    formData.append(`itemName`, itemName);
    formData.append(`itemPrice`, itemPrice);
    formData.append(`itemType`, itemType);
    formData.append(`itemDesc`, itemDesc);

    if(itemImage){
        formData.append(`itemImg`, itemImage);
    }

    try{
        let updateUrl;
        if(itemImage){
            updateUrl = `http://localhost:8081/update-menuItem/${itemId}`;
        }else{
            updateUrl =  `http://localhost:8081/update-menuItemDetails/${itemId}`;
        }

        const response = await fetch(updateUrl, {
            method: `PUT`,
            body: formData
        });

        if(!response.ok){
            console.log(`Failed to update menu item Id: ${itemId} : ${response.status}`);
        }

        if(itemImage){
            console.log(`Menu Item Image updated Successfully!`);
        }else {
            console.log(`Menu Item Details Updated Successfully!`);
        }

        window.location.reload();
    }catch(error){
        console.error(`Error Updating Menu Item: ${error}`);
    }
}

// ================== Delete Menu Item =====================
async  function deleteMenuItem(itemId) {
    if (confirm(`Are you sure you want  to delete this item?`)) {
        try{
            const url = `http://localhost:8081/delete-menuItem/${itemId}`;
            const response = await fetch(url,{
                method:'DELETE'
            });
    
            if(response.ok){
                $(`#row_${itemId}`).remove();
                alert(`Item deleted successfully!`)
                location.reload();
            }else{
                alert('Unable to delete');
                console.error(`Failed to delete Item: `, response.statusText);
            }
        } catch(error){
            console.error(`Error deleting  Item: `,error);
        }
    }else{
        alert(`Item deletion cancelled.`);
    }
}