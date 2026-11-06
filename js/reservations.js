import { initialiser } from "./store.js";
import { render } from "./render.js";

import {
  notify,
  sameName,
  phoneValid,
  nameTaken
} from "./validators.js";

let data = await initialiser();

const params = new URLSearchParams(window.location.search);
const tripId = Number(params.get("id"));

const seats = data.find(t => t.id === tripId);

if (!seats) {
  throw new Error("Trajet introuvable : id=" + tripId);
}

if (!seats.waitlist) {
  seats.waitlist = [];
}

const VIP_COUNT = 4;

// Elements HTML
const reserveForm = document.getElementById("reserve-form");
const reserveMsg = document.getElementById("reserve-msg");
const nomInput = document.getElementById("nom");
const seatSelect = document.getElementById("seat-select");
const tele = document.getElementById("tele");

const namecheck = document.getElementById("edit-name");
const newname = document.getElementById("new-name");
const confiermeedit = document.getElementById("btn-modifer");
const newselect = document.getElementById("newselect");
const modifieMsg = document.getElementById("Modifier-msg");

const SuprimeName = document.getElementById("cancel-name");
const btnSuprime = document.getElementById("btn-annuler");
const annulermsg = document.getElementById("annuler-msg");

const cabinGrid = document.getElementById("seats");

// Helpers
const findByName = name =>
  seats.reservations.find(r =>
    r.name && sameName(r.name, name)
  );

const findBySeat = n =>
  seats.reservations.find(r => r.seat === n);

const freeSeats = () => {
  const free = [];

  for (let i = 1; i <= seats.capacity; i++) {
    if (!findBySeat(i)) free.push(i);
  }

  return free;
};

function renderSelects(select, currentSeat = null) {
  select.innerHTML = "";

  select.appendChild(
    new Option("Automatique (premier siège libre)", "")
  );

  for (let i = 1; i <= seats.capacity; i++) {
    if (findBySeat(i) && i !== currentSeat) continue;

    const label =
      i <= VIP_COUNT ? `Siège ${i} VIP` : `Siège ${i}`;

    select.appendChild(new Option(label, i));
  }
}

function refreshAll() {
  render(seats, data);

  renderSelects(seatSelect);

  renderSelects(
    newselect,
    findByName(namecheck.value.trim())?.seat ?? null
  );
}

function addReservation(seatNumber, name, phone) {
  if (!seatNumber || seatNumber < 1 || seatNumber > seats.capacity) {
    return false;
  }

  if (findBySeat(seatNumber)) return false;

  seats.reservations.push({
    seat: seatNumber,
    name,
    phone
  });

  return true;
}

// Liste d'attente
function addToWaitlist(name, phone) {
  if (freeSeats().length !== 0) return false;

  seats.waitlist.push({ name, phone });

  return true;
}

function promoteFromWaitlist(freedSeat) {
  if (seats.waitlist.length === 0) return null;

  const next = seats.waitlist.shift();

  seats.reservations.push({
    seat: freedSeat,
    name: next.name,
    phone: next.phone
  });

  return next;
}

// Reservation
reserveForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = nomInput.value.trim();

  if (!name) {
    return notify(reserveMsg, "Le nom est obligatoire.", true);
  }

  if (nameTaken(seats, name)) {
    return notify(
      reserveMsg,
      "Ce passager existe déjà.",
      true
    );
  }

  const phone = tele.value.trim();

  if (!phoneValid(phone)) {
    return notify(
      reserveMsg,
      "Numéro de téléphone invalide.",
      true
    );
  }

  const available = freeSeats();

  // Bus complet : liste d'attente uniquement
  if (available.length === 0) {
    addToWaitlist(name, phone);

    refreshAll();
    reserveForm.reset();

    return notify(
      reserveMsg,
      `${name} ajouté à la liste d'attente (position ${seats.waitlist.length}).`
    );
  }

  const seatNumber = seatSelect.value !== ""
    ? Number(seatSelect.value)
    : available[0];

  if (!addReservation(seatNumber, name, phone)) {
    return notify(
      reserveMsg,
      "Ce siège n'est pas disponible.",
      true
    );
  }

  refreshAll();
  reserveForm.reset();

  notify(
    reserveMsg,
    `Réservation confirmée : siège ${seatNumber}.`
  );
});

// Click sur siège
cabinGrid.addEventListener("click", e => {
  const card = e.target.closest("[data-seat]");

  if (!card) return;

  const seatNumber = Number(card.dataset.seat);
  const reservation = findBySeat(seatNumber);

  if (reservation) {
    namecheck.value = reservation.name;
    renderSelects(newselect, reservation.seat);
  } else {
    seatSelect.value = String(seatNumber);
    nomInput.focus();
  }
});

// Modifier réservation
confiermeedit.addEventListener("click", () => {
  const oldName = namecheck.value.trim();
  const current = findByName(oldName);

  if (!current) {
    return notify(modifieMsg, "Passager introuvable.", true);
  }

  const name = newname.value.trim() || current.name;

  if (nameTaken(seats, name, current.seat)) {
    return notify(modifieMsg, "Ce nom est déjà utilisé.", true);
  }

  const oldSeat = current.seat;

  const newSeat = newselect.value !== ""
    ? Number(newselect.value)
    : oldSeat;

  const other = findBySeat(newSeat);

  if (other && other !== current) {
    return notify(modifieMsg, "Ce siège est déjà occupé.", true);
  }

  current.name = name;
  current.seat = newSeat;

  let promoted = null;

  if (newSeat !== oldSeat) {
    promoted = promoteFromWaitlist(oldSeat);
  }

  refreshAll();

  namecheck.value = "";
  newname.value = "";

  let msg = `Réservation modifiée : siège ${newSeat}.`;

  if (promoted) {
    msg += ` ${promoted.name} obtient le siège ${oldSeat}.`;
  }

  notify(modifieMsg, msg);
});

// Annuler réservation
btnSuprime.addEventListener("click", () => {
  const name = SuprimeName.value.trim();

  if (!name) {
    return notify(annulermsg, "Entrez un nom.", true);
  }

  // Vérifier la liste d'attente
  const wIndex = seats.waitlist.findIndex(w =>
    sameName(w.name, name)
  );

  if (wIndex !== -1) {
    const [w] = seats.waitlist.splice(wIndex, 1);

    refreshAll();
    SuprimeName.value = "";

    return notify(
      annulermsg,
      `${w.name} retiré de la liste d'attente.`
    );
  }

  // Vérifier les réservations
  const index = seats.reservations.findIndex(r =>
    r.name && sameName(r.name, name)
  );

  if (index === -1) {
    return notify(annulermsg, "Passager introuvable.", true);
  }

  const [removed] = seats.reservations.splice(index, 1);

// le premier attende entre le seits
  const promoted = promoteFromWaitlist(removed.seat);

  refreshAll();

  SuprimeName.value = "";

  let msg = `Réservation de ${removed.name} annulée.`;

  if (promoted) {
    msg += ` ${promoted.name} obtient le siège ${removed.seat}.`;
  }

  notify(annulermsg, msg);
});

// Initialisation
refreshAll();


