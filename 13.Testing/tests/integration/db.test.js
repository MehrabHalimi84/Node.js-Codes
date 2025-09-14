// فرض میکنیم که در داخل فایل api
// ما دیتا بیس  و سرور رو ران کردیم الان میخوایم فقط تستش کنیم 

let server;
const request = require('supertest');
// مثلا الان سرور رو وصل کردیم به اینجا که تست کنیم 


describe('/api/db', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(() => { server.close(); });

    describe('GET / ', () => {
        it('should return all db', async () => {
            const res = await request(server).get('/api/db');
            expect(res.status).toBe(200);
        });
    });
});

describe('/api/db', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        server.close();
        await Genre.remove({});
    });

    describe('GET / ', () => {
        it('should return all db', async () => {
            await Genre.collection.insertMany([
                { name: 'Genre1' },
                { name: 'Genre2' },
                { name: 'Genre3' }
            ]);

            const res = await request(server).get('/api/db');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body[0]).toHaveProperty('name', 'Genre1');
            expect(res.body[1]).toHaveProperty('name', 'Genre2');
            expect(res.body[2]).toHaveProperty('name', 'Genre3');
        });
    });

    // Test Routes with params

    describe('GET /:id ', () => {
        it('should return a db if valid id passed', async () => {
            const genre = new Genre({ name: 'Genre1' });
            await genre.save();

            const res = await request(server).get('/api/db/' + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        })
    });


    describe('GET /:id ', () => {
        it('should return 404 if is invalid id passed', async () => {

            const res = await request(server).get('/api/db/1');

            expect(res.status).toBe(404);
        })
    });

    // Test POST methods

    describe('POST /', () => {

        // Define the happy path, and then in each test, we change
        // one parameter that clearly aligns with the same name of the test

        it('should return 401 if Client is not logged in', async () => {
            const res = await request(server)
                .post('/api/db')
                .send({ name: 'Genre4' });

            expect(res.status).toBe(401);
        });
        it('should return 400 if genre is less than 5 characters', async () => {
            const token = new User().generateAuthToken();
            const res = await request(server)
                .post('/api/db')
                .set('x-auth-token', token)
                .send({ name: 'Gen' });

            expect(res.status).toBe(400);
        });
    });
    it('should return 400 if genre is more than 50 characters', async () => {
        const token = new User().generateAuthToken();
        const name = new Array(52).join('a');
        const res = await request(server)
            .post('/api/db')
            .set('x-auth-token', token)
            .send({ name: name });

        expect(res.status).toBe(400);
    });
    it('should save the genre if it is valid', async () => {
        const token = new User().generateAuthToken();

        const res = await request(server)
            .post('/api/db')
            .set('x-auth-token', token)
            .send({ name: 'Genre4' });

        const genre = await Genre.find({ name: 'Genre4' });

        expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
        const token = new User().generateAuthToken();

        const res = await request(server)
            .post('/api/db')
            .set('x-auth-token', token)
            .send({ name: 'Genre4' });



        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'Genre4');
    });
});

