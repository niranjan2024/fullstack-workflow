function createShoppingCart() {
  let items = [];
  let discount = 0;

  return {
    addItem(product) {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        existing.quantity += product.quantity;
      } else {
        items.push({ ...product });
      }
    },

    getItems() {
      return items;
    },

    getItemCount() {
      return items.reduce((sum, i) => sum + i.quantity, 0);
    },

    getTotal() {
      const total = items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
      return Number((total - (total * discount) / 100).toFixed(2));
    },

    applyDiscount(code, percent) {
      if (code === "SAVE10") discount = percent;
    },

    clear() {
      items = [];
      discount = 0;
    }
  };
}

const cart = createShoppingCart();

const itemsList = document.getElementById("itemsList");
const itemCount = document.getElementById("itemCount");
const totalPrice = document.getElementById("totalPrice");

const renderCart = () => {
  itemsList.innerHTML = "";

  cart.getItems().forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - Qty: ${item.quantity}`;
    itemsList.appendChild(li);
  });

  itemCount.innerText = cart.getItemCount();
  totalPrice.innerText = cart.getTotal();
};

document.getElementById("addLaptop").addEventListener("click", () => {
  cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 });
  renderCart();
});

document.getElementById("addMouse").addEventListener("click", () => {
  cart.addItem({ id: 2, name: "Mouse", price: 29, quantity: 1 });
  renderCart();
});

document.getElementById("applyDiscount").addEventListener("click", () => {
  cart.applyDiscount("SAVE10", 10);
  renderCart();
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart.clear();
  renderCart();
});
