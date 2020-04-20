function preloadImages(array) {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  var list = preloadImages.list;
  for (var i = 0; i < array.length; i++) {
    var img = new Image();
    img.onload = function () {
      var index = list.indexOf(this);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
    list.push(img);
    img.src = array[i];
    console.log(img.src);
  }
}

preloadImages([
  "../images/buttons/survival.png",
  "../images/buttons/time_attack.png",
  "../images/buttons/easy.png",
  "../images/buttons/medium.png",
  "../images/buttons/hard.png",
  "../images/buttons/anulpha_pass.jpg",
  "../images/buttons/sol2.jpg",
  "../images/buttons/moa_therma.jpg",
  "../images/buttons/tech_de_ra.jpg",
  "../images/buttons/metropia.jpg",
  "../images/buttons/vineta_k.jpg",
]);
