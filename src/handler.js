const { nanoid } = require('nanoid');
const books = require('./books');

const buatbuku = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (name === undefined ) {
    const rspn = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    rspn.code(400);
    return rspn;
  }

  if (pageCount < readPage) {
    const rspn = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    rspn.code(400);
    return rspn;
  }

  const id = nanoid(10);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const bookIndex = books.filter((book) => book.id === id).length > 0;

  if (bookIndex) {
    const rspn = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    rspn.code(201);
    return rspn;
  }
  const rspn = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  rspn.code(500);
  return rspn;
};

const dapatBuku = (request, h) => {
  const { name, reading, finished } = request.query;

  let index = books;

  if (name) {
    index = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    index = books.filter((book) => Number(book.reading) === Number(reading));
  }

  if (finished) {
    index = books.filter((book) => Number(book.finished) === Number(finished));
  }

  const rspn = h.response({
    status: 'success',
    data: {
      books: index.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  rspn.code(200);
  return rspn;
};

const dapatIdBuku = (request, h) => {
  const { id } = request.params;

  const book = books.filter((book) => book.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const rspn = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  rspn.code(404);
  return rspn;
};

const editBuku = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const updatedAt = new Date().toISOString();
  const bookIndex = books.findIndex((book) => book.id === id);

  if (!name) {
    const rspn = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    rspn.code(400);
    return rspn;
  }

  if (pageCount < readPage) {
    const rspn = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    rspn.code(400);
    return rspn;
  }

  if (bookIndex !== -1) {
    const finished = pageCount === readPage;

    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const rspn = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    rspn.code(200);
    return rspn;
  }

  const rspn = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  rspn.code(404);
  return rspn;
};

const hapusIdbuku = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    const rspn = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    rspn.code(200);
    return rspn;
  }

  const rspn = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  rspn.code(404);
  return rspn;
};

module.exports = {
  buatbuku,
  dapatBuku,
  dapatIdBuku,
  editBuku,
  hapusIdbuku,
};
