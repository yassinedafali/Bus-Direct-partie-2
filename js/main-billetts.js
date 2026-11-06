import { initialiser } from "./store.js";

let data = await initialiser();

const pass = document.getElementById("passenger");

pass.innerHTML = "";

data.forEach(trip => {

    trip.reservations.forEach(reservation => {

        const price = reservation.seat <= 4
            ? trip.price * 1.1
            : trip.price;

        pass.innerHTML += `
            <tr>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-user text-gray-500"></i>
                        <span class="break-words">
                            ${reservation.name}
                        </span>
                    </div>
                </td>

                <td class="px-4 py-3">
                    ${reservation.seat}
                </td>

                <td class="px-4 py-3 whitespace-nowrap">
                    ${price.toFixed(2)} DH
                </td>

                <td class="px-4 py-3 whitespace-nowrap">
                    <span class="text-green-700">
                        Confirmé
                        <i class="fa-solid fa-circle-check"></i>
                    </span>
                </td>
            </tr>
        `;
    });

});