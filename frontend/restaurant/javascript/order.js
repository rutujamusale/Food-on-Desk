// ===================== Search Bar for search Orders  =======================

$(document).ready(() =>{
    $('.btn-search').click(function() {
        var searchTerm = $('#search').val().toLowerCase();
    
        $('#order-table tbody tr').each(function() {
            var rowText = $(this).find('td:eq(1), td:eq(2), td:eq(3)').text().toLowerCase();

            if (rowText.includes(searchTerm)) {
            $(this).show();
            } else {
            $(this).hide();
            }
        });
        });
    
        // Add a keyup event listener to the search input field
        $('#search').keyup(function() {
        $('.btn-search').click();
    });
});

// ===================== Get all order =========================

// $(document).ready(async function() {
//     try {
//         const url = "http://localhost:8081/orderData";
//         const response = await fetch(url);

//         if (response.ok) {
//             const data = await response.json();

//             data.forEach(function(order) {
//                 $('#order-list').append(`
//                 <tr>
//                     <td>${order.srNo}</td>
//                     <td>${order.orderId}</td>
//                     <td>${order.tableNo}</td>
//                     <td>${order.userId}</td>

//                     <td id="status_${order.srNo}" style="color: ${statusColor};">${order.status}</td>
//                     <td><button id="view-order" onclick="showDetails(${order.srNo})">View Details</button></td>
//                     <td id="amount_${order.srNo}" style="color: ${paymentColor};">${order.amount}</td>
//                     <td id="payment_${order.srNo}" style="color: ${paymentColor};">${order.payment}</td>
//                     <td><button id="accept_${order.srNo}" onclick="acceptOrder(${order.srNo})" style="color: #0d6efd">Accept</button></td>
//                     <td><button id="decline" onclick="declineOrder(${order.srNo})">Decline</button></td>
//                     <td><button id="paid" onclick="markPaid(${order.srNo})" style="color: #0d6efd">Paid</button></td>
//                 </tr>`);
//             });
//         } else {
//             console.error("Failed to fetch data:", response.statusText);
//         }
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// });

//==============================================================


const recentOrders = [
    {
        "srNo": 1,
        "orderId": "#8234",
        "tableNo": "TBL-001",
        "userId": "9825411354",
        "payment": "Not Paid",
        "amount": "$50",
        "status": "Pending"
    },
    {
        "srNo": 2,
        "orderId": "#8242",
        "tableNo": "TBL-004",
        "userId": "9876543210",
        "payment": "Not Paid",
        "amount": "$100",
        "status": "Pending"
    },
    {
        "srNo": 3,
        "orderId": "#4832",
        "tableNo": "TBL-006",
        "userId": "5483548654",
        "payment": "Not Paid",
        "amount": "$100",
        "status": "Pending"
    }
];

    recentOrders.forEach(function(order) {
    const row = document.createElement("tr");

    // Set initial font color based on status
    let statusColor = "";
    switch (order.status) {
        case "Pending":
            statusColor = "#F29339"; // Orange
            break;
        case "Active":
            statusColor = "#0d6efd"; // blue
            break;
        case "Delivered":
            statusColor = "#00a700"; // green
            break;
        default:
            statusColor = "black"; // Default color
    }

     // Set initial font color based on payment status
    let paymentColor = order.payment === "Not Paid" ? "red" : "green";

    row.innerHTML =
        `<td>${order.srNo}</td>
        <td>${order.orderId}</td>
        <td>${order.tableNo}</td>
        <td>${order.userId}</td>
    
        <td id="status_${order.srNo}" style="color: ${statusColor};">${order.status}</td>
        <td><button id="view-order" onclick="showDetails(${order.srNo})">View Details</button></td>
        <td id="amount_${order.srNo}" style="color: ${paymentColor};">${order.amount}</td>
        <td id="payment_${order.srNo}" style="color: ${paymentColor};">${order.payment}</td>
        <td><button id="accept_${order.srNo}" onclick="acceptOrder(${order.srNo})" style="color: #0d6efd">Accept</button></td>
        <td><button id="decline" onclick="declineOrder(${order.srNo})">Decline</button></td>
        <td><button id="paid" onclick="markPaid(${order.srNo})" style="color: #0d6efd">Paid</button></td>
        `;
        
        document.getElementById("order-list").appendChild(row);
    });

//========================= functionality ==================

// Function to accept an order
function acceptOrder(srNo) {
    const order = recentOrders.find(order => order.srNo === srNo);
    order.status = "Active";
    document.getElementById("status_" + srNo).textContent = "Active";
    document.getElementById("status_" + srNo).style.color = "#0d6efd"; //blue
    console.log("Accepted " + srNo);

    // Disable the accept button and change its style
    const acceptButton = document.getElementById("accept_" + srNo);
    acceptButton.disabled = true;
    acceptButton.style.color = "gray";
}


// Function to decline an order
function declineOrder(srNo) {
    const order = recentOrders.find(order => order.srNo === srNo);
    order.status = "Cancelled";
    document.getElementById("status_" + srNo).textContent = "Cancelled";
    document.getElementById("status_" + srNo).style.color = "#f44336";  //red

    document.getElementById("payment_" + srNo).style.color = "#f44336"; //red

    document.getElementById("amount_" + srNo).style.color = "#f44336"; //red
    console.log("Declined " + srNo);

    // Update payment status to "Declined"
    order.payment = "Declined";
    document.getElementById("payment_" + srNo).textContent = "Declined";
}


// Function to mark an order as paid and update status to "Delivered"
function markPaid(srNo) {
    const order = recentOrders.find(order => order.srNo === srNo);
    order.payment = "Paid";
    document.getElementById("payment_" + srNo).textContent = "Paid";
    document.getElementById("payment_" + srNo).style.color = "#00a700"; //green

    document.getElementById("status_" + srNo).textContent = "Delivered";
    document.getElementById("status_" + srNo).style.color = "#00a700"; //green

    document.getElementById("amount_" + srNo).style.color = "#00a700"; //green
    console.log("Marked Paid " + srNo + " and updated status to Delivered");
}



function filterOrderStatus(status) {
    let filteredOrders = [];
    if (status === "all") {
        filteredOrders = recentOrders;
    } else {
        filteredOrders = recentOrders.filter(order => order.status === status);
    }
    renderOrders(filteredOrders);
}

// Initial rendering
renderOrders(recentOrders);