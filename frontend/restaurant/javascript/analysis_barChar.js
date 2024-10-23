
const ctx = document.getElementById('myChart');
const ctx1 = document.getElementById('order');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
        label: 'Total Revenue',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }] 
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    });

    new Chart(ctx1, {
    type: 'bar',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Total Orders',
        data: [12, 19, 3, 5, 2, 9],
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
});
