const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
  return response.json([
    'Projeto1',
    'Projeto2',
  ]);
});

app.post('/projects', (request, response) => {
  return response.json([
    'Projeto1',
    'Projeto2',
    'Projeto3',
  ]);
});

app.put('/projects/:id', (request, response) => {
  return response.json([
    'Projeto4',
    'Projeto2',
    'Projeto3',
  ]);
});

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto4',
    'Projeto3',
  ]);
});

app.listen(3333, () => {
  console.log('👨‍💻 Back-end started!')
});