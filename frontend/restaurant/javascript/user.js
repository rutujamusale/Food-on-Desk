// // ===================== Search Bar for search user  =======================
$(document).ready(() => {
    $('#customer-table tbody').append(`<tr id="not-found" style="display: none;"><td style="color: red;" colspan='8' align='center'>Customer Not Found!!</td></tr>`);

    $('.btn-search').click(function() {
        var searchTerm = $('#search').val().toLowerCase();
        var found = false; // if any data is found

        $('#customer-table tbody tr').each(function() {
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




// ================ Get all User data ==============================

$(document).ready(async function() {
    const url = "http://localhost:8081/allUserData";
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        data.forEach(function(item) {
            $(`#customer-table tbody`).append(`
                <tr>
                <td>${item.sr_no}</td>
                <td>${item.userId}</td>
                <td>${item.name}</td>
                <td>${item.mobileNo}</td>
                <td class="point">${`+`+item.points}</td>
                </tr>`);
        });
    } else {
        console.error("Failed to fetch data:", response.statusText);
    }
});