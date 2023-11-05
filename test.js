fetch('https://ultramarine-deer-yoke.cyclic.cloud/api/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
    // Puedes añadir otras cabeceras si es necesario, como tokens de autorización
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then(data => {
    // Hacer algo con los datos obtenidos
    console.log(data);
  })
  .catch(error => {
    console.error('Se produjo un error:', error);
  });
