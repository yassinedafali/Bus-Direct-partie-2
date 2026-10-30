
 
 const nomInput = document.getElementById("nom");
const seatSelect = document.getElementById("seat-select");
const reserveForm = document.getElementById("reserve-form");
const reserveMsg = document.getElementById("reserve-msg");
const libreEl = document.querySelector(".libre");
const occupeEl = document.querySelector(".occupe");
const priceEl = document.querySelector(".totalprice");
const fillRateEl = document.getElementById("fill-rate");
function render() {
  renderSeats();
  renderSelects(seatSelect);
  renderSelects(newselect);   
  renderStats();
  save();
}
const revenueDetailEl = document.getElementById("revenue-detail");
const PRICE = 80;
 let seats = JSON.parse(localStorage.getItem("seats")) ||
  Array.from({ length: 20 }, (_, i) => ({ number: i + 1, passenger: null }));
const freeSeats = () => seats.filter(s => !s.passenger);
const save = () => localStorage.setItem("seats", JSON.stringify(seats));
const nameExists = name =>
  seats.some(s => s.passenger && s.passenger.toLowerCase() === name.toLowerCase());
function renderSeats() {
  const cabinGrid = document.getElementById("seats");
  cabinGrid.innerHTML = "";                       
  seats.forEach(seat => {
    const seatCard = document.createElement("div");
    seatCard.className =
      "rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all shadow-sm border " +
      (seat.passenger
        ? "bg-red-600 text-white border-red-700"
        : "bg-white border-gray-200 hover:border-black");
    seatCard.setAttribute("data-seat", seat.number);
    seatCard.innerHTML =`
      <i class="fa-solid fa-couch" aria-hidden="true"></i>
      <span class="text-xs font-bold">Siège ${seat.number}</span>
      <span class="badge text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        seat.passenger ? "bg-white text-red-700" : "bg-gray-100 text-gray-700"
      }"></span>
      <i class="fa-solid fa-user text-gray-500"></i>
    `;
    
    seatCard.querySelector(".badge").textContent =
      seat.passenger ?  seat.passenger : "Libre";

    cabinGrid.appendChild(seatCard);

    if (seat.number % 4 === 2) {                 
      cabinGrid.appendChild(document.createElement("div"));
    }
  });  
}
function renderSelects(seatSelect) {
  seatSelect.innerHTML = "";
  seatSelect.appendChild(new Option("Automatique (premier siège libre)", ""));
  freeSeats().forEach(s =>
    seatSelect.appendChild(new Option(`Siège ${s.number}`, s.number))
  );
}
function renderStats() {
  const free = freeSeats ().length;
  const occupied = seats.length - free;
  libreEl.textContent = free;
  occupeEl.textContent = occupied;
  priceEl.textContent = `${occupied * PRICE} DH`;
  fillRateEl.textContent = `${Math.round((occupied / seats.length) * 100)} % de remplissage`;
  revenueDetailEl.textContent = `${occupied} réservation(s) × ${PRICE} DH`;

}
render()

let msgTimer;
let timers={};
function notify(el, text, isError = false) {
 clearTimeout(timers[el.id]);
  el.textContent = text;
  el.className = "text-sm font-medium min-h-[1.25rem] " + (isError ? "text-red-600" : "text-green-600")
  timers[el.id]= setTimeout(() => { el.textContent = ""; }, 3000);
}
