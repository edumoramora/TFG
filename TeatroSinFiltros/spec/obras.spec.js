const request = require('supertest');
const app = require('../backend/server'); 

describe('API de obras', () => {
  it('debe crear una nueva obra y devolver un mensaje de éxito', async () => {
    const nuevaObra = {
      titulo: 'Obra de Prueba',
      imagen_url: 'http://url-de-imagen.com/imagen.jpg',
      descripcion: 'Descripción de la obra de prueba'
    };

    const response = await request(app).post('/api/obras').send(nuevaObra);
    console.log('Respuesta de creación de obra:', response.body);

    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe('Obra creada con éxito');
  });

  it('debe devolver un error si falta un campo obligatorio', async () => {
    const obraIncompleta = {
      titulo: 'Obra Incompleta'
    };

    const response = await request(app).post('/api/obras').send(obraIncompleta);
    console.log('Respuesta de error de obra incompleta:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe('Falta la descripción y la imagen');
  });

  it('debe devolver un error si falta un campo obligatorio', async () => {
    const obraIncompleta = {
      imagen_url: 'http://url-de-imagen.com/imagen.jpg'
    };

    const response = await request(app).post('/api/obras').send(obraIncompleta);
    console.log('Respuesta de error de obra incompleta:', response.body);

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe('Falta la descripción y el titulo');
  });

  it('debe devolver un error si falta la descripción y la imagen', async () => {
    const obraIncompleta = { descripcion: 'Obra Incompleta' };
  
    const response = await request(app).post('/api/obras').send(obraIncompleta);
    console.log('Respuesta de error:', response.body);
  
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toContain('Faltan campos obligatorios: imagen_url, titulo');
  });
  
  it('debe devolver un error si falta el título y la descripción', async () => {
    const obraIncompleta = { imagen_url: 'http://url-de-imagen.com/imagen.jpg',descripcion: 'Obra Incompleta' };
  
    const response = await request(app).post('/api/obras').send(obraIncompleta);
    console.log('Respuesta de error:', response.body);
  
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toContain('Faltan campos obligatorios: titulo');
  });

  it('debe devolver un error si falta el título y la descripción', async () => {
    const obraIncompleta = { titulo: 'Obra Incompleta', imagen_url: 'http://url-de-imagen.com/imagen.jpg' };
  
    const response = await request(app).post('/api/obras').send(obraIncompleta);
    console.log('Respuesta de error:', response.body);
  
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toContain('Faltan campos obligatorios: descripcion');
  });

  it('debe devolver un error si falta el título y la descripción', async () => {
    const obraIncompleta = { titulo: 'Obra Incompleta', descripcion: 'Obra Incompleta' };
  
    const response = await request(app).post('/api/obras').send(obraIncompleta);
    console.log('Respuesta de error:', response.body);
  
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toContain('Faltan campos obligatorios: descripcion');
  });

  it('debe devolver un error si se intenta añadir una obra con un título que ya existe', async () => {
    const obraOriginal = {
      titulo: 'Obra Existente',
      imagen_url: 'http://url-de-imagen.com/imagen1.jpg',
      descripcion: 'Descripción de la obra existente'
    };
  
    await request(app).post('/api/obras').send(obraOriginal);
  
    const obraDuplicada = {
      titulo: 'Obra Existente',
      imagen_url: 'http://url-de-imagen.com/imagen2.jpg',
      descripcion: 'Descripción de la obra duplicada'
    };
  
    const response = await request(app).post('/api/obras').send(obraDuplicada);
    console.log('Respuesta de error para obra duplicada:', response.body);
  
    expect(response.status).toBe(409); 
    expect(response.body.mensaje).toBe('Ya existe una obra con ese título');
  });

});


