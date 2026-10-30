const seats = JSON.parse(localStorage.getItem("seats")) ||
    Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        passenger: null
    }));

const pass = document.getElementById("passenger");

pass.innerHTML = "";

seats.forEach(seat => {
    if (seat.passenger !== null) {
        pass.innerHTML += `
            <tr>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-user text-gray-500"></i>
                        <span class="break-words">${seat.passenger}</span>
                    </div>
                </td>

                <td class="px-4 py-3">
                    ${seat.number}
                </td>

                <td class="px-4 py-3 whitespace-nowrap">
                    80 DH
                </td>

                <td class="px-4 py-3 whitespace-nowrap">
                    <span class="text-green-700">
                        Confirmé
                        <i class="fa-solid fa-circle-check"></i>
                    </span>
                </td>
            </tr>
        `;
    }
});