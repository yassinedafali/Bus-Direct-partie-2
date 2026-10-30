async function initialiser() {
    const savedTrips = localStorage.getItem("trips");

    if (savedTrips) {
        return JSON.parse(savedTrips);
    }

    const response = await fetch("/data/trips.json");
    const trips = await response.json();

    localStorage.setItem("trips", JSON.stringify(trips));

    return trips;
}
initialiser();
