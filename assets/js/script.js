let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;

document.getElementById("gameCards").addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    event.target.className += " hidden";
    firstCardClasses = event.target.previousElementSibling.className;
    console.log("first:", firstCardClasses);
  } else {
      secondCardClicked = event.target;
      event.target.className += " hidden";
      secondCardClasses = event.target.previousElementSibling.className;
      document.getElementById("gameCards").removeEventListener('click', handleClick);
      console.log("second:", secondCardClasses);
      if (firstCardClasses === secondCardClasses) {
        console.log("The images match");
        firstCardClicked = null;
        secondCardClicked = null;
        document.getElementById("gameCards").addEventListener('click', handleClick);
      } else {
          console.log("The images do not match");
          setTimeout(function(){
          firstCardClicked.classList.remove("hidden");
          secondCardClicked.classList.remove("hidden");
          firstCardClicked = null;
          secondCardClicked = null;
          document.getElementById("gameCards").addEventListener('click', handleClick);
          }, 1500);
        }
    }
}
