// =================== add promocode  functionality =================
function create_promo() {
    var eventName = document.getElementById('eventName').value;
    var promoCode = document.getElementById('promocode').value;
    var discount = document.getElementById('discount').value;
    var useLimit = document.getElementById('use-limit').value;
    var discountType = document.getElementById('discount_type').value;
    var expiryDateTime = document.getElementById('expirydate').value;

    // Convert the datetime-local format to "YYYY-MM-DD HH:MM:SS"
    var formattedExpiryDate = expiryDateTime.replace("T", " ") + ":00";

    var data = {
        eventName: eventName,
        promoCod: promoCode,
        discount: discount,
        useLimit: useLimit,
        dicType: discountType,
        expiryDateTime: formattedExpiryDate
    };

    fetch('http://localhost:8081/add-promocode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Promotion saved successfully');
        } else {
            console.error('Failed to save promotion');
        }
    })
    .catch(error => console.error('Error:', error));
}

// ====================== Get all Promo Codes =============================
$(document).ready(async function(){
    const url = "http://localhost:8081/get-all-promcodes";
    const response = await fetch(url);

    if(response.ok){
        const data = await response.json();

        data.forEach(function (prCode) {
            let status = "Active";
            const currentDateTime = new Date();
            const expiryDateTime = new Date(prCode.expiryDateTime);

            if(currentDateTime > expiryDateTime){
                status = "Expired";
            }

            $('#promotable tbody').append(`
                <tr>
                    <td>${prCode.promoId}</td>
                    <td>${prCode.eventName}</td>
                    <td>${prCode.promoCod}</td>
                    <td>${prCode.discount}% off</td>
                    <td>${prCode.useLimit}</td>
                    <td>${prCode.dicType}</td>
                    <td>${prCode.expiryDateTime}</td>
                    <td>${status}</td>
                    <td><a id="delete" onclick="deletePromo(${prCode.promoId})" class="danger" href="#">Delete</a></td>
                </tr>`);
        });
    }else{
        console.log("Error: ", response.statusText);
    }
});

//===================== delete Promo code ====================
async function deletePromo(id) {
    if (confirm(`Are you sure you want to delete this promo code?`)) {
        try {
            const deleteUrl = `http://localhost:8081/delete-promoCode/${id}`;
            const response = await fetch(deleteUrl, {
                method: 'DELETE'
            });

            if (response.ok) {
                $('#promo-row-' + id).remove();
                alert(`Promo code deleted successfully!`);
                location.reload(true);
            } else {
                console.error(`Failed to delete Promo code:`, response.statusText);
                alert('Error deleting promo code.');
            }
        } catch (error) {
            console.error(`Error deleting promo code:`, error);
            alert(`Error deleting promo code.`);
        }
    } else {
        alert(`Promo code deletion cancelled.`);
    }
}