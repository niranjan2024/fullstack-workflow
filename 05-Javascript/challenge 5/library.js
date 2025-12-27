class Library {
  constructor() {
    this.books = [];
    this.members = [];
    this.transactions = [];
  }

  addBook({ isbn, title, author, copies }) {
    this.books.push({ isbn, title, author, copies });
  }

  getAvailableCopies(isbn) {
    const book = this.books.find(b => b.isbn === isbn);
    const borrowed = this.transactions.filter(
      t => t.isbn === isbn && !t.returnedAt
    ).length;

    return book ? book.copies - borrowed : 0;
  }

  searchBooks(keyword) {
    const key = keyword.toLowerCase();
    return this.books.filter(
      b =>
        b.title.toLowerCase().includes(key) ||
        b.author.toLowerCase().includes(key)
    );
  }

  addMember({ id, name, email }) {
    this.members.push({ id, name, email });
  }

  borrowBook(memberId, isbn) {
    if (this.getAvailableCopies(isbn) <= 0) return;

    const book = this.books.find(b => b.isbn === isbn);
    const member = this.members.find(m => m.id === memberId);

    if (!book || !member) return;

    this.transactions.push({
      memberId,
      isbn,
      title: book.title,
      borrowedAt: new Date(),
      returnedAt: null
    });
  }

  returnBook(memberId, isbn) {
    const record = this.transactions.find(
      t => t.memberId === memberId && t.isbn === isbn && !t.returnedAt
    );

    if (record) {
      record.returnedAt = new Date();
    }
  }

  getMemberHistory(memberId) {
    return this.transactions.filter(t => t.memberId === memberId);
  }

  getOverdueBooks() {
    const now = new Date();
    const limit = 14 * 24 * 60 * 60 * 1000;

    return this.transactions.filter(
      t => !t.returnedAt && now - t.borrowedAt > limit
    );
  }
}

function createLibrary() {
  return new Library();
}

const library = createLibrary();
const output = document.getElementById("output");

document.getElementById("setup").addEventListener("click", () => {
  library.addBook({ isbn: "123", title: "1984", author: "Orwell", copies: 3 });
  library.addBook({ isbn: "456", title: "Dune", author: "Herbert", copies: 2 });

  library.addMember({ id: "M1", name: "John", email: "john@example.com" });
  library.addMember({ id: "M2", name: "Jane", email: "jane@example.com" });

  output.innerText = "Library setup completed";
});

document.getElementById("borrow").addEventListener("click", () => {
  library.borrowBook("M1", "123");
  library.borrowBook("M2", "123");

  output.innerText =
    "Available copies of 1984: " +
    library.getAvailableCopies("123");
});

document.getElementById("return").addEventListener("click", () => {
  library.returnBook("M1", "123");

  output.innerText = JSON.stringify(
    library.getMemberHistory("M1"),
    null,
    2
  );
});

document.getElementById("overdue").addEventListener("click", () => {
  output.innerText = JSON.stringify(
    library.getOverdueBooks(),
    null,
    2
  );
});
