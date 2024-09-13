const submitButton = document.querySelector("#submit");
const productName = document.querySelector("#name");
const quantity = document.querySelector("#quantity");
const shop = document.querySelector("#shop");
const note = document.querySelector("#note");
const allItemsToBuy = document.querySelector("#itemsList");
const allBoughtItems = document.querySelector("#boughtList");

getAllItemsToBuy();
getAllBoughtsItems();

// Register list items
submitButton.addEventListener("click", (ev) => {
  const listItem = {
    name: productName.value,
    quantity: quantity.value,
    shop: shop.value,
    note: note.value,
  };
  console.log(listItem);
  //fetch('localhost:7878/api/v1/shoppinglist')
  fetch("http://localhost:7878/api/v1/shoppinglist", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(listItem),
  }).then((res) => {
    if (res.ok) getAllItemsToBuy();
  });
});

function getAllItemsToBuy() {
  allItemsToBuy.innerHTML = "";
  fetch("http://localhost:7878/api/v1/shoppinglist/status/bought=false")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        const container = document.createElement("article");
        container.classList.add("list");
        
        const name = document.createElement("div");
        name.classList.add("listItem");
        name.innerHTML = element.name;
        
        const quantity = document.createElement("div");
        quantity.classList.add("listItem");
        const selectElement = document.querySelector('select[name="unit"]');
        const selectedValue = selectElement.value;
        quantity.innerHTML = element.quantity + " " + selectedValue;
        
        const shop = document.createElement("div");
        shop.classList.add("listItem");
        shop.innerHTML = element.shop;

        const note = document.createElement("div");
        note.classList.add("listItem");
        note.innerHTML = element.note;

        const bought = document.createElement("input");
        bought.setAttribute("type", "checkbox");
        bought.classList.add("checkBoxId");
        bought.addEventListener("click", () => markAsBought(element.id));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", () => deleteProduct(element.id));

        container.append(name, quantity, shop, note, bought, deleteButton);
        allItemsToBuy.appendChild(container);
      });
    });
}

function getAllBoughtsItems() {
  allBoughtItems.innerHTML = "";
  fetch("http://localhost:7878/api/v1/shoppinglist/status/bought=true")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        const container = document.createElement("article");
        container.classList.add("list");
        const name = document.createElement("div");
        name.classList.add("listItem");
        name.innerHTML = element.name;
        const quantity = document.createElement("div");
        quantity.classList.add("listItem");
        quantity.innerHTML = element.quantity;
        const shop = document.createElement("div");
        shop.classList.add("listItem");
        shop.innerHTML = element.shop;
        const note = document.createElement("div");
        note.classList.add("listItem");
        note.innerHTML = element.note;

        const bought = document.createElement("input");
        bought.setAttribute("type", "checkbox");
        bought.classList.add("checkBoxId");
        bought.addEventListener("click", () => markAsBought(element.id));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", () => deleteProduct(element.id));

        container.append(name, quantity, shop, note, bought, deleteButton);
        allBoughtItems.appendChild(container);
      });
    });
}

function deleteProduct(id) {
  console.log("Element with id:" + id + " deleted fro the list");
  fetch("http://localhost:7878/api/v1/shoppinglist/" + id, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      getAllItemsToBuy();
      getAllBoughtsItems();
    }
  });
}

function markAsBought(id) {
  console.log("Element with id:" + id + " marked as bought");
  fetch("http://localhost:7878/api/v1/shoppinglist/" + id, {
    method: "PUT",
  }).then((res) => {
    if (res.ok) {
      getAllItemsToBuy();
      getAllBoughtsItems();
    }
  });
}
