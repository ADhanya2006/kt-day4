// test.js
const Book = require("./models/Book");

async function main() {
  try {
    // 1️⃣ Insert 7 books
    await Book.insertMany([
      { title: "Clean Code", author: "Robert C. Martin", category: "Programming", publishedYear: 2008, availableCopies: 5 },
      { title: "Atomic Habits", author: "James Clear", category: "Self-Help", publishedYear: 2018, availableCopies: 8 },
      { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", publishedYear: 1993, availableCopies: 3 },
      { title: "Deep Work", author: "Cal Newport", category: "Productivity", publishedYear: 2016, availableCopies: 4 },
      { title: "Sapiens", author: "Yuval Noah Harari", category: "History", publishedYear: 2015, availableCopies: 6 },
      { title: "You Don’t Know JS", author: "Kyle Simpson", category: "Programming", publishedYear: 2020, availableCopies: 7 },
      { title: "Ikigai", author: "Héctor García", category: "Self-Help", publishedYear: 2016, availableCopies: 2 }
    ]);
    console.log("✅ 7 Books inserted successfully");

    // 2️⃣ Read all books
    const allBooks = await Book.find();
    console.log("\n📚 All Books:");
    console.log(allBooks);

    // Books by category
    const category = "Programming";
    const booksByCategory = await Book.find({ category });
    if (!booksByCategory.length) throw new Error("No books found in this category");
    console.log(`\n📚 Books in category "${category}":`);
    console.log(booksByCategory);

    // Books after 2015
    const recentBooks = await Book.find({ publishedYear: { $gt: 2015 } });
    console.log("\n📚 Books published after 2015:");
    console.log(recentBooks);

    // 3️⃣ Update: increase/decrease copies
    const bookToUpdate = allBooks[0]; // just picking first book
    const change = -2; // decrease 2 copies
    if (bookToUpdate.availableCopies + change < 0) throw new Error("Negative stock not allowed");
    bookToUpdate.availableCopies += change;
    await bookToUpdate.save();
    console.log(`\n✅ Updated copies for "${bookToUpdate.title}"`);

    // Change category
    const bookForCategory = allBooks[1];
    bookForCategory.category = "Motivation"; // new category
    await bookForCategory.save();
    console.log(`✅ Category changed for "${bookForCategory.title}"`);

    // 4️⃣ Delete if copies = 0
    const bookForDelete = allBooks.find(b => b.availableCopies === 0);
    if (bookForDelete) {
      await Book.findByIdAndDelete(bookForDelete._id);
      console.log(`✅ Deleted book "${bookForDelete.title}" because copies = 0`);
    } else {
      console.log("\nNo books with 0 copies to delete");
    }

  } catch (error) {
    console.error("\n❌ Error:", error.message);
  } finally {
    process.exit();
  }
}

main();
