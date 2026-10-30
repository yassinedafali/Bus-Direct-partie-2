reserveForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = nomInput.value.trim();
  if (!name) return notify(reserveMsg, "Le nom du passager est obligatoire.", true);
  if (nameExists(name)) return notify(reserveMsg, "Ce passager a déjà une réservation.", true);

  const seat = seatSelect.value
    ? seats.find(s => s.number === Number(seatSelect.value))
    : freeSeats()[0];
////msg de bus est terminie
  if (!seat) return notify(reserveMsg, "Le bus est complet.", true);
  
  seat.passenger = name;
  render();
  reserveForm.reset();
  notify(reserveMsg, `Réservation confirmée : siège ${seat.number}.`);
});