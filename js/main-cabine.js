const reserveContent = document.getElementById("reserve-content");
const editContent = document.getElementById("edit-content");
const cancelContent = document.getElementById("cancel-content");

function showTab(tabToShow) {
  [reserveContent, editContent, cancelContent].forEach((el) => {
    el.classList.add("hidden");
  });
  tabToShow.classList.remove("hidden");
}

document.getElementById("tab-reserve").addEventListener("click", () => showTab(reserveContent));
document.getElementById("tab-edit").addEventListener("click", () => showTab(editContent));
document.getElementById("tab-cancel").addEventListener("click", () => showTab(cancelContent));