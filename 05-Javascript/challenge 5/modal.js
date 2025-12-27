const createModal = ({ title, content, buttons }) => {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";

  /* ---------- Header ---------- */
  const header = document.createElement("div");
  header.className = "modal-header";

  const h2 = document.createElement("h3");
  h2.innerText = title;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.className = "close-btn";

  header.appendChild(h2);
  header.appendChild(closeBtn);

  /* ---------- Body ---------- */
  const body = document.createElement("div");
  body.innerText = content;

  /* ---------- Footer ---------- */
  const footer = document.createElement("div");
  footer.className = "modal-footer";

  buttons.forEach(btn => {
    const button = document.createElement("button");
    button.innerText = btn.text;
    button.className = btn.type;

    button.addEventListener("click", () => {
      btn.onClick();
    });

    footer.appendChild(button);
  });

  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(footer);
  overlay.appendChild(modal);

  /* ---------- Close Logic ---------- */
  const closeModal = () => {
    overlay.classList.remove("active");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
      overlay.remove();
      document.removeEventListener("keydown", escHandler);
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  const escHandler = (e) => {
    if (e.key === "Escape") closeModal();
  };

  /* ---------- Public API ---------- */
  return {
    open() {
      document.body.appendChild(overlay);
      document.body.classList.add("modal-open");
      setTimeout(() => overlay.classList.add("active"), 10);
      document.addEventListener("keydown", escHandler);
    },
    close: closeModal
  };
};

/* ---------- Usage Example ---------- */
const openBtn = document.getElementById("openModalBtn");

openBtn.addEventListener("click", () => {
  const modal = createModal({
    title: "Confirm Delete",
    content: "Are you sure you want to delete this item?",
    buttons: [
      {
        text: "Cancel",
        type: "secondary",
        onClick: () => modal.close()
      },
      {
        text: "Delete",
        type: "danger",
        onClick: () => {
          alert("Deleted!");
          modal.close();
        }
      }
    ]
  });

  modal.open();
});
