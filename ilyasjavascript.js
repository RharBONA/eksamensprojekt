
const knap = document.getElementById("ilyasknap");
let sok = document.getElementById("ilyassog");
var sogFelt = document.getElementById("ilyassogfelt");


function skiftBillede(id, img1, img2) {
  let element = document.getElementById(id);
  let billeder = [img1, img2];
  let i = 0;

  setInterval(function () {
    element.src = billeder[i % 2];
    i++;
  }, 1000);
}

skiftBillede("bryllupImg", "billeder/ilyasbilleder/bryllup1.webp", "billeder/ilyasbilleder/bryllup2.webp");


let bruger = {
  navn: "Liwira",
  aktiv: true,
};

function visBruger() {
  if (bruger.aktiv === true) {
    console.log("Bruger aktiv: " + bruger.navn);
  }
}
visBruger();


sok.addEventListener("click", function () {
  sogFelt.classList.toggle("show");
  sogFelt.focus();
});


let varer = 3;
let total = varer + 2;

let harKurv = true;
if (harKurv && total > 4) {
  console.log("Du har " + total + " varer i kurven.");
}



sogFelt.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const søgning = sogFelt.value.trim();
    if (søgning === "Bamse bjørn") {
      const element = document.querySelector(".bamsebjørn");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert("Bamse bjørn findes ikke på siden!");
      }
    } else {
      alert("Det søgte element findes ikke på siden");
    }
  }
});
