  export async function initialiser() {
    
    const savedTrips = JSON.parse(localStorage.getItem("trips"));

    if (savedTrips) {
        return savedTrips;
    }

    const response = await fetch("../data/trips.json");
    
    const trips = await response.json();

    localStorage.setItem("trips", JSON.stringify(trips));

    return trips;
}
