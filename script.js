//funktion til at se eller skjule de ekstra cirkler ved leverandører
function toggleCircles() {
    const extra = document.getElementById("extra-circles"); //finder de ekstra cirkler
    const toggleMore = document.getElementById("toggle-more"); //finder se mere pilen
    const toggleLess = document.getElementById("toggle-less"); //finder se mindre pilen
  
    const isHidden = extra.classList.contains("hidden"); //tjekker om ekstra cirkler er skjulte
  
    if (isHidden) {
      //for at skjule de ekstra leverandører
      extra.classList.remove("hidden");
      toggleLess.classList.remove("hidden"); //"se mindre" vises 
      toggleMore.classList.add("hidden"); // "se mere" skjules
    } else {
      //for at vise ekstra leverandører
      extra.classList.add("hidden");
      toggleLess.classList.add("hidden"); //"se mindre" skjules
      toggleMore.classList.remove("hidden"); // vis "Se mere"
      window.scrollTo({ top: document.querySelector(".suppliers").offsetTop, behavior: 'smooth' });//glidende effekt når der scrolles ved leverandører
    }
  }

  //variabel der holder styr på hvilket kort sæt der vises
  let currentSlide = 0;
  const cardSets = document.querySelectorAll(".card-set"); //alle kort findes
  const dots = document.querySelectorAll(".dot"); //alle dots findes
  
  //funktion til at vise et bestemt kort sæt
  function showSlide(index) {
    //den aktive fjernes
    cardSets.forEach((set, i) => {
      set.classList.remove("active");
      dots[i].classList.remove("active-dot");
    });
  //den aktive tilføjes
    cardSets[index].classList.add("active");
    dots[index].classList.add("active-dot");
  }
  
  //funktionen til at gå til næste kortsæt
  function nextSlide() {
    currentSlide = (currentSlide + 1) % cardSets.length; 
    showSlide(currentSlide); //ny slide vises
  }
  
    //funktionen til at gå til forrige kortsæt
  function prevSlide() {
    currentSlide = (currentSlide - 1 + cardSets.length) % cardSets.length;
    showSlide(currentSlide); //ny slide vises
  }
  
//showSlide aktiveres med det første slide når siden er færdig indlæst
document.addEventListener("DOMContentLoaded", () => {
    showSlide(currentSlide);
  });
  


//priser
const prices = { //i html er hver produkt kaldt et item, og her er prisen
  item1: 0,
  item2: 0,
  item3: 0,
  item4: 0,
  item5: 80,
  item6: 60,
  item7: 52,
  item8: 44,
  item9: 50,
  item10: 50,
  item11: 50,
  item12: 50,
  item13: 140,
  item14: 180,
  item15: 152,
  item16: 115,
  item17: 140,
  item18: 180,
  item19: 120,
  item20: 130,
  item21: 90,
  item22: 90,
  item23: 90,
  item24: 90,
  item25: 30,
  item26: 40,
  item27: 55,
  item28: 75,
  item29: 35,
  item30: 45,
  item31: 25,
  item32: 55,
  item33: 50,
  item34: 50,
  item35: 50,
  item36: 50,
  item37: 72,
  item38: 68,
  item39: 42,
  item40: 88,
  item41: 30,
  item42: 32,
  item43: 55,
  item44: 40,
  item45: 50,
  item46: 65,
  item47: 75,
  item48: 65,
  item49: 115,
  item50: 115,
  item51: 115,
  item52: 115,

};

//valg af kort
const selectedItems = {}; //gemmer hvilke varer der er valgt i hver kategori
const checkoutItemsContainer = document.getElementById('checkoutItems'); //container hvor de valgte varer vises
const totalPriceDisplay = document.getElementById('totalPrice'); //hvor totalprisen vises

//går igennem alle kort og tilføjer pris og klik-event
document.querySelectorAll('.step-card').forEach(card => {
  const category = card.closest('.subcategory')?.dataset.category; //kategori for kortet bliver fundet
  const itemId = card.dataset.itemId; //id på kortet findes

  //pris på kortet
  if (prices[itemId] && !card.querySelector('.card-price')) {
    const priceEl = document.createElement('p');
    priceEl.textContent = `Pris: ${prices[itemId]} kr.`;
    card.appendChild(priceEl);
  }
//når der klikkes på et kort
  card.addEventListener('click', () => {
    if (!category || !itemId) return; //hvis ikke der findes kategori eller id, så sker der ikke noget

    //det tidligere valgte fra samme klasse (kategori) fjernes
    document.querySelectorAll(`.subcategory[data-category="${category}"] .step-card`)
      .forEach(c => c.classList.remove('selected'));

    //markerer kortet som valgt når der trykkes på det
    card.classList.add('selected');

    //det valgte bliver gemt nede i bunden på siden (selecteditems)
    selectedItems[category] = {
      id: itemId,
      image: card.querySelector('img').src, //billedet findes
      qty: 1, //starter med 1stk. 
      price: prices[itemId] || 0 //prisen for det valgte vare
    };

    updateCheckoutView(); //checkoutdelen opdateres
  });
});

//checkout delen (nederst på siden)
//funktion til at opdatere visningen af det valgte og totalpris
function updateCheckoutView() {
  checkoutItemsContainer.innerHTML = '';
  let total = 0;

    //går igennem alle de valgte ting
  Object.values(selectedItems).forEach((item, index) => {
    total += item.price * item.qty; //beregner totalprisen

    const itemEl = document.createElement('div');
    itemEl.classList.add('checkout-item');
    itemEl.innerHTML = `
      <img src="${item.image}" alt="Valgt">
      <button class="remove-item" data-index="${index}">&times;</button>
      <div class="qty-control">
        <button class="decrease" data-index="${index}">-</button>
        <span>${item.qty}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <div class="price-tag">${(item.price * item.qty).toFixed(2)} kr.</div>
    `;
    checkoutItemsContainer.appendChild(itemEl);
  });

  const discountMessageEl = document.getElementById('discountMessage');

  //200kr. rabat hvis man overstiger 600kr. 
  let discount = 0;
  if (total > 600) {
    discount = 200;
    discountMessageEl.textContent = "Du har fået 200 kr. rabat!"; //beskeden man får når man har ramt det beløb og fået rabat
    discountMessageEl.style.color = "#007700"; //teksten bliver grøn
  } else {
    const difference = 600 - total;
    discountMessageEl.textContent = `Tilføj for ${difference.toFixed(2)} kr. mere og få 200 kr. rabat!`; //står hvor meget man mangler at købe for, for at få udnytte sig af rabattem
    discountMessageEl.style.color = "#aa5500"; //teksten er orange
  }

  const totalAfterDiscount = Math.max(0, total - discount); //det samlede pris efter rabat

  totalPriceDisplay.textContent = `${totalAfterDiscount.toFixed(2)} kr.`; //pris opdateres
}

//klik på knapperne i checkout (fjern, tilføj)
document.addEventListener('DOMContentLoaded', () => {
  const checkoutItemsContainer = document.getElementById('checkoutItems');
  if (!checkoutItemsContainer) return; //hvis ikke det findes sker der ikke noget element ikke findes 

  checkoutItemsContainer.addEventListener('click', (e) => {
    const index = e.target.dataset.index; //finder hvilken vare der bliver klikket på
    const keys = Object.keys(selectedItems);
    const key = keys[index]; //finder kategori key

    if (!key) return; //hvis ikke den er der sker der ikke noget

    if (e.target.classList.contains('remove-item')) { //varen fjernes når man trykker på slet knappen
      delete selectedItems[key];
      updateCheckoutView();
    } else if (e.target.classList.contains('increase')) {
      selectedItems[key].qty++; //antal af varen stiger når man trykker på + knappen
      updateCheckoutView();
    } else if (e.target.classList.contains('decrease')) { //antal af varen falder når man trykker på - knappen, men mindst 1 vare skal være der
      if (selectedItems[key].qty > 1) {
        selectedItems[key].qty--;
        updateCheckoutView();
      }
    }
  });
});


//slider funktion
let currentIndex = 0;
let itemsPerView = window.innerWidth <= 768 ? 2 : 3; //antal viste varer bestemmes ud fra skærmbredde

//venstre pil, man går tilbage hvis det er muligt
document.querySelector('.left-arrow').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
  }
});

//når skærmen ændrer størrelse, justeres antal viste varer og slider position
window.addEventListener('resize', () => {
  itemsPerView = window.innerWidth <= 768 ? 2 : 3;
  if (currentIndex > Object.keys(selectedItems).length - itemsPerView) {
    currentIndex = Math.max(0, Object.keys(selectedItems).length - itemsPerView);
  }
  updateSliderPosition();
});

document.querySelector('.right-arrow').addEventListener('click', () => {
  const totalItems = Object.keys(selectedItems).length;
  if (currentIndex < totalItems - itemsPerView) {
    currentIndex++;
    updateSliderPosition();
  }
});

//funktion til at flytte slider til den korrekt position
function updateSliderPosition() {
  const itemEl = document.querySelector('.checkout-item');
  if (!itemEl) return;

  const itemWidth = itemEl.offsetWidth;
  const gap = 20; //afstanden mellem varerne
  const scrollAmount = (itemWidth + gap) * currentIndex;

  checkoutItemsContainer.style.transform = `translateX(-${scrollAmount}px)`;
}



//gavebånd farvevalg
const colorCircles = document.querySelectorAll('.color-circle');

colorCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    //tidligere valgt fjernes
    colorCircles.forEach(c => c.classList.remove('selected'));
    //når en ny er markeret
    circle.classList.add('selected');

    const selectedColor = circle.dataset.color;
    console.log('Valgt gavebånd:', selectedColor); //valgt farve vises
  });
});

//popup nyhedsbrev
const newsletterPopup = document.getElementById('newsletterPopup'); //popup hentes
const ctaButton = document.querySelector('.btn-hero'); //cta hentes
const closePopup = document.getElementById('closePopup'); //kryds knappen i popup hentes
const newsletterForm = document.getElementById('newsletterForm'); //nyhedsbrev formualr hentes
const responseMessage = document.getElementById('responseMessage'); //svarbesked hentes

//når man trykker på cta knappen på forsiden
ctaButton.addEventListener('click', function(event) {
    event.preventDefault(); //forhindrer standard formularadfærd
    newsletterPopup.style.display = 'flex'; //popup vises
});

//når man trykker på krydset i popup 
closePopup.addEventListener('click', function() {
    newsletterPopup.style.display = 'none'; //lukkes popup
});

//når man indsender formularen
newsletterForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value; //email hentes
    responseMessage.innerText = `Tak for din tilmelding, ${email}!`; //bekræftelsesbesked
});

//når man klikker udenfor popup formularen
window.addEventListener('click', function(event) {
    if (event.target === newsletterPopup) { //når man klikket udenfor indholdet
        newsletterPopup.style.display = 'none'; //lukkes pop-up
    }
});