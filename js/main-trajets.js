import { initialiser } from "./store.js";

let data = await initialiser();

const container = document.getElementById("trips-container");
const bouton1 = document.getElementById("bouton1");
const bouton2 = document.getElementById("bouton2");
const bouton3 = document.getElementById("bouton3");
const bouton4 = document.getElementById("bouton4");
const totalpalaces = document.getElementById("totalpaces");
const totalpassager = document.getElementById("totalpassager");
const totalprice = document.getElementById("totalprice");
const search = document.getElementById("search-city");
const filter = document.getElementById("fillter-btn");
const selectdis = document.getElementById("filter-status");

// Affichage des trajets
function disponible(start, end) {

    container.innerHTML = "";

    for (let i = 0;  i < data.length; i++) {
        if(i>=start && i<=end){

        let result = checkdisponible(data[i]);

        container.innerHTML += `
        <article class="rounded-xl border border-zinc-200 p-5 transition hover:shadow-md">

            <div class="mb-4 flex items-center justify-between">

                <span class="rounded-lg bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    trajet ${i + 1}
                </span>

                <span class="rounded-full px-3 py-1 text-xs font-semibold
                ${result.dispo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${result.content}
                </span>

            </div>

            <div class="mb-5 flex items-center justify-between gap-3">

                <div>
                    <p class="text-xs text-zinc-500">Départ</p>
                    <h3 class="text-lg font-bold">${data[i].departure}</h3>
                    <p class="text-sm text-zinc-500">${data[i].departureTime}</p>
                </div>

                <div class="flex flex-1 flex-col items-center">
                    <i class="fa-solid fa-bus text-xl text-amber-500"></i>
                    <div class="my-2 h-px w-full bg-zinc-300"></div>
                    <span class="text-xs text-zinc-500">5h</span>
                </div>

                <div class="text-right">
                    <p class="text-xs text-zinc-500">Arrivée</p>
                    <h3 class="text-lg font-bold">${data[i].destination}</h3>
                    <p class="text-sm text-zinc-500">${data[i].arrivalTime}</p>
                </div>

            </div>

            <div class="grid grid-cols-3 gap-2 border-t border-zinc-200 pt-4 text-center">

                <div>
                    <p class="text-xs text-zinc-500">Prix</p>
                    <p class="font-bold">${data[i].price}</p>
                </div>

                <div>
                    <p class="text-xs text-zinc-500">Places libres</p>
                    <p class="font-bold text-green-600">${result.placesLibres}</p>
                </div>

                <div>
                    <p class="text-xs text-zinc-500">Attente</p>
                    <p class="font-bold">${data[i].waitingList?.length || 0}</p>
                </div>

            </div>

            <a href="cabine.html?${data[i].id}"
                class="mt-5 block rounded-lg bg-amber-500 p-3 text-center font-semibold text-black hover:bg-amber-400">

                <i class="fa-solid fa-chair mr-2"></i>
                Gérer les réservations

            </a>

        </article>`;
    }
}}

disponible(0,5);

bouton1.addEventListener("click", () => disponible(0, 5));
bouton2.addEventListener("click", () => disponible(6, 11));
bouton3.addEventListener("click", () => disponible(12, 17));
bouton4.addEventListener("click", () => disponible(18, data.length - 1));


// Total passagers
const totalpassagers = data.reduce(
    (sum, trip) => sum + trip.reservations.length,
    0
);

totalpassager.innerHTML = totalpassagers;


// Total revenus
let totalprices = 0;

for (let i = 0; i < data.length; i++) {

    let placesOccupees = data[i].reservations.length;

    totalprices += data[i].price * placesOccupees;
}

totalprice.innerHTML = `${totalprices} DH`;


// Vérifier disponibilité
function checkdisponible(trip) {

    let placesLibres = trip.capacity - trip.reservations.length;

    let dispo = placesLibres > 0;
////////dispo or no
    let content = dispo ? "Disponible" : "Complet";

    return {
        dispo,
        content,
        placesLibres
    };
}

// Recherche + Filtre (ensemble, au clic sur le bouton)
filter.addEventListener("click", () => {

    let recherche = search.value.trim().toLowerCase();
    let valeur = selectdis.value;

    let resultats = data.filter(trip => {

        let ville = (trip.departure + " " + trip.destination).toLowerCase();
        let result = checkdisponible(trip);

        let searchOK = ville.includes(recherche);

        let statusOK =
            valeur === "all" ||
            (valeur === "available" && result.dispo) ||
            (valeur === "full" && !result.dispo);
console.log("aee")
        return searchOK && statusOK;
    });

    afficher(resultats);
});

// Affichage des résultats filtrés
function afficher(trajets) {

    container.innerHTML = "";

    for (let i = 0; i < trajets.length; i++) {

        let result = checkdisponible(trajets[i]);

        container.innerHTML += `
        <article class="rounded-xl border border-zinc-200 p-5 transition hover:shadow-md">

            <div class="mb-4 flex items-center justify-between">

                <span class="rounded-lg bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    trajet ${data.indexOf(trajets[i]) + 1}
                </span>

                <span class="rounded-full px-3 py-1 text-xs font-semibold
                ${result.dispo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${result.content}
                </span>

            </div>

            <div class="mb-5 flex items-center justify-between gap-3">

                <div>
                    <p class="text-xs text-zinc-500">Départ</p>
                    <h3 class="text-lg font-bold">${trajets[i].departure}</h3>
                    <p class="text-sm text-zinc-500">${trajets[i].departureTime}</p>
                </div>

                <div class="flex flex-1 flex-col items-center">
                    <i class="fa-solid fa-bus text-xl text-amber-500"></i>
                    <div class="my-2 h-px w-full bg-zinc-300"></div>
                    <span class="text-xs text-zinc-500">5h</span>
                </div>

                <div class="text-right">
                    <p class="text-xs text-zinc-500">Arrivée</p>
                    <h3 class="text-lg font-bold">${trajets[i].destination}</h3>
                    <p class="text-sm text-zinc-500">${trajets[i].arrivalTime}</p>
                </div>

            </div>

            <div class="grid grid-cols-3 gap-2 border-t border-zinc-200 pt-4 text-center">

                <div>
                    <p class="text-xs text-zinc-500">Prix</p>
                    <p class="font-bold">${trajets[i].price}</p>
                </div>

                <div>
                    <p class="text-xs text-zinc-500">Places libres</p>
                    <p class="font-bold text-green-600">${result.placesLibres}</p>
                </div>

                <div>
                    <p class="text-xs text-zinc-500">Attente</p>
                    <p class="font-bold">${trajets[i].waitingList?.length || 0}</p>
                </div>

            </div>

            <a href="cabine.html?${trajets[i].id}"
                class="mt-5 block rounded-lg bg-amber-500 p-3 text-center font-semibold text-black hover:bg-amber-400">

                <i class="fa-solid fa-chair mr-2"></i>
                Gérer les réservations

            </a>

        </article>`;
    }
}