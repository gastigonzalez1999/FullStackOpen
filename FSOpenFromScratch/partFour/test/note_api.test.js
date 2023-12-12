/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})

test('blogs can be updated with PUT', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  };

  const response = await api.post('/api/blogs').send(newBlog);
  const updatedBlog = { ...response.body, likes: 10 }; // Update the likes

  await api
    .put(`/api/blogs/${response.body.id}`)
    .send(updatedBlog)
    .expect(200);

  const fetchedUpdatedBlog = await api.get(`/api/blogs/${response.body.id}`);

  expect(fetchedUpdatedBlog.body.likes).toBe(10);
});

test('blogs can be deleted with DELETE', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  };

  const response = await api.post('/api/blogs').send(newBlog);

  await api.delete(`/api/blogs/${response.body.id}`).expect(204);

  const fetchedBlog = await api.get(`/api/blogs/${response.body.id}`);

  expect(fetchedBlog.status).toBe(404);
});

afterAll(() => {
  mongoose.connection.close()
})