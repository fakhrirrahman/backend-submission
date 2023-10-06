const { buatbuku,
    dapatBuku,
    dapatIdBuku,
    editBuku,
    hapusIdbuku,} = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: buatbuku,
    },
    {
      method: 'GET',
      path: '/books',
      handler: dapatBuku,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: dapatIdBuku,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: editBuku,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: hapusIdbuku,
    },
  ];
  
  module.exports = routes;
  