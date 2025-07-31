 // JavaScript to handle toggle text change
 document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('bauble_check');
    var toggleText = document.querySelector('.toggle_text');
  
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            toggleText.textContent = 'Non-Veg';
        } else {
            toggleText.textContent = 'Veg';
        }
    });
  });
  let currentScrollPosition = 0;
  let scrollAmount = 160;
  
  const sCont = document.querySelector(".menu-contain");
  console.log('scont',sCont.of);
  const hScroll = document.querySelector(".horizontal-scroll");
  const btnScrollLeft = document.querySelector("#btn-scroll-left");
  const btnScrollRight = document.querySelector("#btn-scroll-right");
  
  btnScrollLeft.style.opacity = "0";
  // const element = document.getElementsByClassName("horizontal-scroll");
  // const rect = element.getBoundingClientRect();
  // console.log("Width of horiontal scroll: " + rect.width + "px");
  
  // let maxScroll = sCont.offsetwidth + hScroll.offsetwidth;
  let maxScroll=-1100;
  console.log('maxscroll',maxScroll);
  console.log('sCont.offsetwidth',sCont.offsetwidth)
  console.log('hScroll.offsetwidth',hScroll.offsetwidth)
  
  function scrollHorizontally(val){
      currentScrollPosition +=(val * scrollAmount);
      console.log('current',currentScrollPosition)
  
      if(currentScrollPosition >= 0){
          currentScrollPosition = 0
          btnScrollLeft.style.opacity = "0";
          console.log("button disable")
      }
      else{
          btnScrollLeft.style.opacity = "1";
      }
      if(currentScrollPosition < maxScroll){
          currentScrollPosition = maxScroll;
          btnScrollRight.style.opacity = "0";
          console.log("right button clicked");
  
      }
      else{
          btnScrollRight.style.opacity = "1";
      }
      sCont.style.left = currentScrollPosition + "px";
  }
  
  // Get the button
  let mybutton = document.getElementById("myBtn");
  
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
//   function myFunction() {
//     var dots = document.getElementById("dots");
//     var moreText = document.getElementById("more");
//     var btnText = document.getElementById("read");
  
//     if (dots.style.display === "none") {
//       dots.style.display = "inline";
//       btnText.innerHTML = "Read more"; 
//       moreText.style.display = "none";
//     } else {
//       dots.style.display = "none";
//       btnText.innerHTML = "Read less"; 
//       moreText.style.display = "inline";
//     }
//   }
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("card");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("menu-contain");
var btns = btnContainer.getElementsByClassName("filter-card");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}