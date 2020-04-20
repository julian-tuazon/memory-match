function preloadImages(arr) {
  if (!preloadImages.list) preloadImages.list = [];
  const list = preloadImages.list;
  for (let i = 0; i < arr.length; i++) {
    const img = new Image();
    img.onload = () => {
      console.log('Loaded', img.src);
      const index = list.indexOf(this);
      if (index !== -1) list.splice(index, 1);
    }
    list.push(img);
    img.src = arr[i];
  }
}

function preloadImagePromise(src) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.src);
    } catch(err) {
      reject(err);
    }
  });
}

// const prom1 = new Promise(resolve => {
//   const img = new Image();
//   img.src = "assets/images/buttons/button1.gif";
//   img.onload = () => {
//     console.log('Promise made', img.src);
//     resolve(img.src);
//   }
// });
// const prom2 = new Promise(resolve => {
//     const img = new Image();
//     img.src = "assets/images/buttons/button3.gif";
//     img.onload = () => {
//       console.log('Promise made', img.src);
//       resolve(img.src);
//     }
// });

  // preloadImage("assets/images/buttons/button3.gif"),
  // preloadImage("assets/images/buttons/survival.png"),
  // preloadImage("assets/images/buttons/time_attack.png"),
  // preloadImage("assets/images/buttons/easy.png"),
  // preloadImage("assets/images/buttons/medium.png"),
  // preloadImage("assets/images/buttons/hard.png"),
  // preloadImage("assets/images/buttons/anulpha_pass.jpg"),
  // preloadImage("assets/images/buttons/metropia.jpg"),
  // preloadImage("assets/images/buttons/moa_therma.jpg"),
  // preloadImage("assets/images/buttons/sol2.jpg"),
  // preloadImage("assets/images/buttons/tech_de_ra.jpg"),
  // preloadImage("assets/images/buttons/vineta_k.jpg")

Promise.all([
  preloadImagePromise("assets/images/buttons/button1.gif"),
  preloadImagePromise("assets/images/buttons/button3.gif"),
  preloadImagePromise("assets/images/buttons/survival.png"),
  preloadImagePromise("assets/images/buttons/time_attack.png"),
  preloadImagePromise("assets/images/buttons/easy.png"),
  preloadImagePromise("assets/images/buttons/medium.png"),
  preloadImagePromise("assets/images/buttons/hard.png"),
  preloadImagePromise("assets/images/buttons/anulpha_pass.jpg"),
  preloadImagePromise("assets/images/buttons/metropia.jpg"),
  preloadImagePromise("assets/images/buttons/moa_therma.jpg"),
  preloadImagePromise("assets/images/buttons/sol2.jpg"),
  preloadImagePromise("assets/images/buttons/tech_de_ra.jpg"),
  preloadImagePromise("assets/images/buttons/vineta_k.jpg")
])
  .then((values) => {
    console.log('the deed is done!', 'values', values);
    document.getElementById('load-screen').classList.add('hidden');
    document.getElementById('sound-screen').classList.remove('hidden');
    loadGameImages();
  })
  .catch((err) => {
    console.error(err);
    document.getElementById('load-screen').classList.add('hidden');
    document.getElementById('sound-screen').classList.remove('hidden');
    loadGameImages();
  });

const loadGameImages = () => {
  preloadImages([
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
}
