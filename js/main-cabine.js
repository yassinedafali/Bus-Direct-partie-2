const tabReserve = document.getElementById("tab-reserve");
const tabEdit = document.getElementById("tab-edit");
const tabCancel = document.getElementById("tab-cancel");

const reserveContent = document.getElementById("reserve-content");
const editContent = document.getElementById("edit-content");
const cancelContent = document.getElementById("cancel-content");

tabReserve.addEventListener("click", () => {
  reserveContent.hidden = false;
  editContent.hidden = true;
  cancelContent.hidden = true;
});

tabEdit.addEventListener("click", () => {
  reserveContent.hidden = true;
  editContent.hidden = false;
  cancelContent.hidden = true;
  editContent.classList.remove("hidden");
});

tabCancel.addEventListener("click", () => {
  reserveContent.hidden = true;
  editContent.hidden = true;
  cancelContent.hidden = false;
  cancelContent.classList.remove("hidden");
});