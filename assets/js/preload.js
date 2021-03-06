function preloadImages(arr) {
  if (!preloadImages.list) preloadImages.list = [];
  const list = preloadImages.list;
  for (let i = 0; i < arr.length; i++) {
    const img = new Image();
    img.onload = () => {
      const index = list.indexOf(this);
      if (index !== -1) list.splice(index, 1);
    }
    list.push(img);
    img.src = arr[i];
  }
}

preloadImages([
  "assets/images/buttons/button1.gif",
  "assets/images/buttons/button3.gif",
  "assets/images/buttons/survival.png",
  "assets/images/buttons/time_attack.png",
  "assets/images/buttons/easy.png",
  "assets/images/buttons/medium.png",
  "assets/images/buttons/hard.png",
  "assets/images/buttons/anulpha_pass.jpg",
  "assets/images/buttons/metropia.jpg",
  "assets/images/buttons/moa_therma.jpg",
  "assets/images/buttons/sol2.jpg",
  "assets/images/buttons/tech_de_ra.jpg",
  "assets/images/buttons/vineta_k.jpg",
  "assets/images/backgrounds/anulpha_pass.jpg",
  "assets/images/backgrounds/metropia.jpg",
  "assets/images/backgrounds/moa_therma.jpg",
  "assets/images/backgrounds/sol2.jpg",
  "assets/images/backgrounds/tech_de_ra.jpg",
  "assets/images/backgrounds/vineta_k.jpg",
  "assets/images/cards/card_back_static.jpg",
  "assets/images/buttons/button1_static.jpg",
  "assets/images/buttons/button2_static.jpg",
  "assets/images/buttons/button3_static.jpg",
  "assets/images/buttons/button4_static.jpg",
  "assets/images/buttons/header_static.jpg",
  "assets/images/cards/card_back.gif",
  "assets/images/cards/card_hover.gif",
  "assets/images/buttons/header.gif",
  "assets/images/buttons/button2.gif",
  "assets/images/buttons/button4.gif",
]);
