const body = document.querySelector('body'),
        sidebar = body.querySelector('.sidebar'),
        toggle = body.querySelector( '.toggle' ),
        searchBtn = body.querySelector('.search-box'),
        modeSwitch = body.querySelector('.toggle-switch'),
        modeText = body.querySelector('.mode-text');

        // search btn sidebar close  on click  open
        searchBtn.addEventListener("click", () =>{
            sidebar.classList.remove( "close" );
        });

        // Toggle Sidebar
        toggle.addEventListener("click", () =>{
            sidebar.classList.toggle( "close" );
        });

// ================== Dark Mode ==================
    const darkModeOnLoad = localStorage.getItem("isDark") === null ? false
    : JSON.parse(localStorage.getItem("isDark"));

    if (darkModeOnLoad) {
        body.classList.add("dark");
        modeText.innerText = "Light Mode";
    } else {
        body.classList.remove("dark");
        modeText.innerText = "Dark Mode";
    }

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
        let isDark = body.classList.contains("dark");
        localStorage.setItem("isDark", JSON.stringify(isDark));
        
        if (isDark) {
            modeText.innerText = "Light Mode";
        } else {
            modeText.innerText = "Dark Mode";
            }
    });

// ============ Admin logout =========
document.getElementById("logoutButton").addEventListener("click", function(event) {
    event.preventDefault();

    sessionStorage.clear();
    window.location.href = "../html/index.html";
});