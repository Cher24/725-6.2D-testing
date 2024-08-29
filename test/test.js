import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; // Make sure to include the .js extension when using ES modules
const expect = chai.expect;

chai.use(chaiHttp);

describe('Projects API', () => {
  
  // Test GET route for fetching all projects (restaurants)
  it('should fetch all projects', (done) => {
    chai.request(app)
      .get('/api/projects')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test POST route for adding a new project (restaurant)
  it('should add a new project', (done) => {
    const newProject = {
      name: 'New Restaurant',
      cuisine: 'American',
      borough: 'Brooklyn'
    };

    chai.request(app)
      .post('/api/projects')
      .send(newProject)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('name', 'New Restaurant');
        done();
      });
  });

  // Example test for /myprojects route
  it('should return the correct response for /myprojects route', (done) => {
    chai.request(app)
      .get('/api/projects/myprojects')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('This is the /api/projects/myprojects route');
        done();
      });
  });
});
