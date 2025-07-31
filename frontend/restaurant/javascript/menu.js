// ===================== Search Bar for search category  =======================
$(document).ready(() => {
    $('#catTable tbody').append(`<tr id="not-found" style="display: none;"><td style="color: red;" colspan='4' align='center'>No Category Found!!</td></tr>`);

    $('.btn-search').click(function() {
        var searchTerm = $('#search').val().toLowerCase();
        var found = false; // if any data is found

        $('#catTable tbody tr').each(function() {
            var rowText = $(this).find('td:eq(1), td:eq(2), td:eq(3)').text().toLowerCase();

            if (rowText.includes(searchTerm)) {
                $(this).show();
                found = true; //data found
            } else {
                $(this).hide();
            }
        });

        // Display or hide "Not Found" message search result
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

// ====================== display add Category form ==============
document.getElementById("btn-add-category").addEventListener("click", function(){
    console.log("Button clicked");
    document.getElementById("newCategory").style.display = "block";
});

let categoryPic = document.getElementById("category-pic");
let inputFile = document.getElementById("input-file");

inputFile.onchange = function(){
    categoryPic.src = URL.createObjectURL(inputFile.files[0]);
}

// Cancel add Category form
document.getElementById("cancelCategoryForm").addEventListener("click", function(){
    console.log("Button clicked");
    document.getElementById("newCategory").style.display = "none";
});


// ==================== Add new food category form ==============================
$(document).ready(async function() {
    $("#saveCategoryBtn").on('click', function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        let catName = $('#cateName').val();
        let image = $('#input-file')[0].files[0];
        addNewCategory(catName, image);
    })
});


const addNewCategory = async (cateName, catImg) => {
    let formData = new FormData();
    formData.append('categoryName', cateName);
    formData.append('catImage', catImg);

    if(!cateName){
        $(`#mssgAlert`).show();
        return;
    }else{
        $(`#mssgAlert`).hide();
    }

    if(!catImg){
        $(`#imageAlert`).show();
        return;
    }else{
        $(`#imageAlert`).hide();
    }

    const response = await fetch('http://localhost:8081/add-category', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert("Category added successfully");
        location.reload();
    }
}

// ======================= Display all menu Category Data ==================================
$(document).ready(async function() {
    try {
        const categoryUrl = "http://localhost:8081/getAllMenuCatagories";
        const categoryResponse = await fetch(categoryUrl);
    
        if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json();
            categoryData.forEach(function(category) {
                const editForm = `
                    <tr id="edit-form-row-${category.categoryId}" style="display: none;">
                        <td colspan="6">
                            <form class="edit-catForm" id="edit-form-${category.categoryId}">
                                <div class="text-title">Update Category</div>
                                
                                <div class="input-field ">
                                    <label class="selectImg" for="catImage-${category.categoryId}">Select Image</label>
                                    <img src="data:image/*;base64, ${category.catImage}" id="category-pic-${category.categoryId}">
                                    <input type="file" accept="image/*" id="catImage-${category.categoryId}" hidden/>
                                </div>
                                <div class="input-field ">
                                    <label for="categoryName-${category.categoryId}">Category Name</label>
                                    <input type="text" id="categoryName-${category.categoryId}" value="${category.categoryName}" required>
                                </div>
                                <div class="buttons">
                                    <button class="submit-btn button" onclick="updateCategory(${category.categoryId})">Update</button>
                                    <button class="cancel-btn button" onclick="cancelEditForm(${category.categoryId})">Cancel</button>
                                </div>
                            </form>
                        </div>
                        </td>
                    </tr>
                `;
                $(`#catTable tbody`).append(`
                    <tr>
                        <td>${category.categoryId}</td>
                        <td>${category.categoryName}</td>
                        <td><img style="width:85px; border-radius:60%" src="data:image/*;base64, ${category.catImage}" /></td>
                        <td><button class="bttn" id="edit-btn" onclick="showEditForm(${category.categoryId})">Edit</button></td>
                        <td><button class="bttn" id="delete-btn" onclick="deleteCategory(${category.categoryId})">Delete</button></td>
                        <td><a onclick="viewCatItemByCategoryId(${category.categoryId})" href="../html/menuItem.html?categoryId=${category.categoryId}" id="viewItem">View Items</a></td>
                    </tr>
                    ${editForm}
                `);
                console.log("Category Data Loaded Successfully!");
            });
        } else {
            console.error("Failed to fetch Category data:", categoryResponse.statusText);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

function viewCatItemByCategoryId(categoryId) {
    // Navigate to menuItem.html with the categoryId as a query parameter
    window.location.href = `../html/menuItem.html?categoryId=${categoryId}`;
}

// Hide and show edit form
function showEditForm(categoryId) {
    $('[id^="edit-form-row-"]').hide();
    $(`#edit-form-row-${categoryId}`).show();
}

function cancelEditForm(categoryId) {
    $(`#edit-form-row-${categoryId}`).hide();
}


// =================== Update menu Category ======================
async function updateCategory(categoryId) {
    const categoryName = $(`#categoryName-${categoryId}`).val();
    const catImage = $(`#catImage-${categoryId}`).prop('files')[0];

    const formData = new FormData();
    formData.append('categoryName', categoryName);

    if (catImage) {
        // formData.append('categoryName', categoryName);
        formData.append('catImage', catImage);
    }

    try {
        let updateUrl;
        if (catImage) {
            updateUrl = `http://localhost:8081/update-category/${categoryId}`;
        } else {
            updateUrl = `http://localhost:8081/update-category-name/${categoryId}`;
        }

        const response = await fetch(updateUrl, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            console.log(`Failed to update category: ${response.statusText}`);
        }

        if (catImage) {
            console.log(`Category updated successfully!`);
        } else {
            console.log(`Category name updated successfully!`);
        }
        location.reload();
    } catch (error) {
        console.error(`Error updating category:`, error);
    }
}

// ======================== Delete category ===========================
async function deleteCategory(categoryId) {
    if (confirm(`Are you sure you want to delete this category?`)) {
        try {
            const deleteUrl = `http://localhost:8081/delete-category/${categoryId}`;
            const response = await fetch(deleteUrl, {
                method: 'DELETE'
            });

            if (response.ok) {
                $(`#category-${categoryId}`).remove();
                alert(`Category deleted successfully!`);
                location.reload();
            } else {
                console.error(`Failed to delete Category: `, response.statusText);
            }
        } catch (error) {
            console.error(`Error deleting category:`, error);
        }
    } else {
        alert(`Category deletion cancelled.`);
    }
}
