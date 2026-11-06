
const timers = {};

export function notify(el, text, isError = false) {
  clearTimeout(timers[el.id]);

  el.textContent = text;
  el.className =
    "text-sm font-medium min-h-[1.25rem] " +
    (isError ? "text-red-600" : "text-green-600");

  timers[el.id] = setTimeout(() => {
    el.textContent = "";
  }, 3000);
}

export const sameName = (a, b) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

export const phoneValid = phone =>
  /^0[67]\d{8}$/.test(phone);

export const inWaitlist = (trip, name) =>
  (trip.waitlist || []).some(w =>
    sameName(w.name, name)
  );

export const nameTaken = (trip, name, exceptSeat = null) =>
  trip.reservations.some(
    r =>
      r.seat !== exceptSeat &&
      r.name &&
      sameName(r.name, name)
  ) || inWaitlist(trip, name);



