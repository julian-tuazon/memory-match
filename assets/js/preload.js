function preloadImages(array) {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  var list = preloadImages.list;
  for (var i = 0; i < array.length; i++) {
    var img = new Image();
    img.onload = function () {
      console.log('Loaded', img.src);
      var index = list.indexOf(this);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
    list.push(img);
    img.src = array[i];
    // console.log(img.src);
  }
}

preloadImages([
  "assets/images/buttons/survival.png",
  "assets/images/buttons/time_attack.png",
  "assets/images/buttons/easy.png",
  "assets/images/buttons/medium.png",
  "assets/images/buttons/hard.png",
  "assets/images/buttons/anulpha_pass.jpg",
  "assets/images/buttons/sol2.jpg",
  "assets/images/buttons/moa_therma.jpg",
  "assets/images/buttons/tech_de_ra.jpg",
  "assets/images/buttons/metropia.jpg",
  "assets/images/buttons/vineta_k.jpg",
]);
