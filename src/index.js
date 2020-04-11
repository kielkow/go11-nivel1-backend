const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
  const { title, owner } = request.query;

  if(title || owner){
    // if owner does not exists
    if(!owner) {
      const filterProjects = projects.filter(project => {
        return project.title.includes(title);
      });
    
      return response.json(filterProjects);
    }

    // if title does not exists
    if(!title) {
      const filterProjects = projects.filter(project => {
        return project.owner.includes(owner);
      });
    
      return response.json(filterProjects);
    }

    // if owner and title exists
    const filterProjects = projects.filter(project => {
      return project.owner.includes(owner) && project.title.includes(title);
    });
  
    return response.json(filterProjects);
  }

  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  let projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found '});
  }

  const project = { id, title, owner };
 
  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  let projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found '});
  }

  projects.splice(projectIndex, 1);

  return response.status(204);
});

app.listen(3333, () => {
  console.log('👨‍💻 Back-end started!')
});