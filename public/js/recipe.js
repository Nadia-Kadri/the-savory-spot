const deleteButton = document.querySelector("#delete-button");

if(deleteButton) {
  deleteButton.addEventListener("click", handleDeleteButtonClick);
}

function handleDeleteButtonClick(e) {
  const button = e.currentTarget;
  const url = "/delete/" + button.dataset.id;

  fetch(url, { method: "DELETE" })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      location.replace("/" + button.dataset.recipeType);
    })
    .catch(err => console.log(`Error: ${err}`));
}