let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = 9;
let matches = 0;

document.getElementById("gameCards").addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if (!firstCardClicked) {
    firstCardClicked = event.target;
    event.target.className += " hidden";
    firstCardClasses = event.target.previousElementSibling.className;
  } else {
      secondCardClicked = event.target;
      event.target.className += " hidden";
      secondCardClasses = event.target.previousElementSibling.className;
      document.getElementById("gameCards").removeEventListener('click', handleClick);
      if (firstCardClasses === secondCardClasses) {
        matches++;
        if (matches === maxMatches) {
          document.getElementById("modal").classList.remove("hidden");
        }
        firstCardClicked = null;
        secondCardClicked = null;
        document.getElementById("gameCards").addEventListener('click', handleClick);
      } else {
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
