import { initialiser } from "./store.js";

let data = await initialiser()
const container=document.getElementById("trips-container")
const bouton1=document.getElementById("bouton1")
const bouton2=document.getElementById("bouton2")
const bouton3=document.getElementById("bouton3")
const bouton4=document.getElementById("bouton4")
 const totalpalaces=document.getElementById("totalpaces")
 const totalpassager=document.getElementById("totalpassager")
const totalprice=document.getElementById("totalprice")

function disponible(start,end){
    container.innerHTML="";

    for( let i=start;i<data.length;i++){
if(i<=end){
        container.innerHTML+= `<article class="rounded-xl border border-zinc-200 p-5 transition hover:shadow-md">

                        <div class="mb-4 flex items-center justify-between">
                            <span class="rounded-lg bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                               trajet ${i+1}
                            </span>

                            <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                Disponible
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
                                <p class="font-bold text-green-600">20</p>
                            </div>

                            <div>
                                <p class="text-xs text-zinc-500">Attente</p>
                                <p class="font-bold">0</p>
                            </div>

                        </div>

                        <a href="cabine.html?${data[i].id}"
                            class="mt-5 block rounded-lg bg-amber-500 p-3 text-center font-semibold text-black hover:bg-amber-400">
                            <i class="fa-solid fa-chair mr-2"></i>
                            Gérer les réservations
                        </a>

                    </article>`}
    }
}
disponible(0,5)
bouton1.addEventListener("click",()=>
disponible(0,5))
bouton2.addEventListener("click",()=>{
    disponible(6,11)
})
bouton3.addEventListener("click",()=>{
    disponible(12,17)
}
)
bouton4.addEventListener("click",()=>{
    disponible(18,data.length)
})
