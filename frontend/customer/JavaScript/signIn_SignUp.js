//============ User signUp Form =================


$(document).ready(function() {
    $('#signUp').submit(async function(e) {
        e.preventDefault();

        const userName = $('#userName').val();
        const mobileNumber = $('#mobileNumber').val();
        const password = $('#password').val();

        const userData = {
            name: userName,
            mobileNo: mobileNumber,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8081/user-regis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            console.log(data);

            alert('User registered successfully');
            window.location.href = './login.html';

        } catch (error) {
            alert(`Failed to register, this mobile number is already in use`);
            console.error(error);
        }
    });
});

// ================== User signIn Form ===============
$(document).ready(function(){
    $('#signIn').submit(async function(event){
        event.preventDefault(); // Prevent the default form submission

        const url = "http://localhost:8081/usr-login";
        const mobNumber = $('#mobNumber').val();
        const password = $('#password').val();

        const requestData = {
            mobNum: mobNumber,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if(response.ok){
                const responseData = await response.json();
                const userName = responseData.name;
                alert(`Welcome, ${userName} login Successful!!!`);
                window.location.href = "../html/menu.html";
            }
            else {
                const responseData = await response.text();
                alert(`Invalid mobile number or password`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred during login. Please try again later.');
        }
    });
});