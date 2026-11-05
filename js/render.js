
const VIP_LIMIT = 4;
const VIP_RATE = 1.10;

const revenueDetailEl = document.getElementById("revenue-detail");
const libreEl = document.querySelector(".libre");
const occupeEl = document.querySelector(".occupe");
const priceEl = document.querySelector(".totalprice");
const fillRateEl = document.getElementById("fill-rate");
const cabinGrid = document.getElementById("seats");

function renderStats(seats) {
  const occupied = seats.reservations.length;
  const free = seats.capacity - occupied;
  const price = seats.price;

  let total = 0;
  let vipCount = 0;

  seats.reservations.forEach(r => {
    if (r.seat <= VIP_LIMIT) {
      total += price * VIP_RATE;
      vipCount++;
    } else {
      total += price;
    }
  });

  libreEl.textContent = free;
  occupeEl.textContent = occupied;
  priceEl.textContent = `${total.toFixed(2)} DH`;

  fillRateEl.textContent =
    `${Math.round((occupied / seats.capacity) * 100)} % de remplissage`;

  revenueDetailEl.textContent =
    `${occupied - vipCount} × ${price} DH + ${vipCount} VIP`;
}

function renderSeats(seats) {
  cabinGrid.innerHTML = "";

  for (let n = 1; n <= seats.capacity; n++) {
    const reservation = seats.reservations.find(
      r => r.seat === n
    );

    const isTaken = Boolean(reservation);

    const seatCard = document.createElement("div");

    seatCard.className =
      "rounded-xl p-2 min-w-0 min-h-[130px] flex flex-col items-center justify-center gap-1 transition-all shadow-sm border " +
      (isTaken
        ? "bg-red-600 text-white border-red-700"
        : "bg-white border-gray-200 hover:border-black");

    seatCard.dataset.seat = n;

    seatCard.innerHTML = `
      <i class="fa-solid fa-couch" aria-hidden="true"></i>

      <span class="text-xs font-bold whitespace-nowrap">
        Siège ${n}
      </span>

      <span class="badge text-[10px] font-semibold px-2 py-0.5 rounded-full max-w-full truncate ${
        isTaken
          ? "bg-white text-red-700"
          : "bg-gray-100 text-gray-700"
      }"></span>

      ${isTaken ? '<i class="fa-solid fa-user"></i>' : ""}

      ${n <= VIP_LIMIT
        ? '<i class="fa-solid fa-crown" style="color: rgb(222, 173, 9);"></i>'
        : ""}
    `;

    seatCard.querySelector(".badge").textContent =
      isTaken ? reservation.name : "Libre";

    cabinGrid.appendChild(seatCard);

    if (n % 4 === 2) {
      cabinGrid.appendChild(document.createElement("div"));
    }
  }
}

export function render(seats, data) {
  renderSeats(seats);
  renderStats(seats);

  if (data) {
    localStorage.setItem("trips", JSON.stringify(data));
  }
}
