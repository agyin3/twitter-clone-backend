require('dotenv').config()
const server = require('../../server')
const supertest = require('supertest')
const request = supertest(server)
const bcrypt = require('bcryptjs')

const User = require('../../data/models/User')
const { setupDB } = require('../../utils/test_setup')

const userData = {
    username: 'king_cobra33', 
    password: 'test1234', 
    name: 'John Johnson', 
    phone: '555555555', 
    email: 'john_john@example.com'
}

const loginCreds = {
    username: 'king_cobra33', 
    password: 'test1234', 
}

const invalidCreds = {
    username: 'king_cobra33', 
    password: 'test1234', 
}

const rounds = +process.env.SALT_ROUNDS


describe('AUTH INTEGRATION TESTS /auth', () => {
    setupDB('fuschia-oxford-cheetah')

    it('is alive', async () => {
        const res = await request.get('/')

        expect(res.status).toBe(200)
    })

    describe('POST /register', () => {
        it('successfully registers a user', async () => {
            const res = await request.post('/auth/register').send(userData)
            const match = {...userData}
            delete match.password

            expect(res.status).toBe(201)
            expect(res.body.user._id).toBeDefined()
            expect(res.body.user.password).not.toBeDefined()
            expect(res.body.token).toBeDefined()
            expect(res.body.user).toMatchObject(match)
        })

        it('successfully throws error with missing data', async () => {
            const incorrectData = {...userData}
            delete incorrectData.password

            const res = await request.post('/auth/register').send(incorrectData)

            expect(res.status).toBe(400)
            expect(res.body.message).toBeDefined()
            expect(res.body.message).toMatch(/required fields/i)
        })
    })

    describe('POST /login', () => {
        it('successful user login', async () => {

            const user = {...userData}
            const hash = bcrypt.hashSync(user.password, rounds)
            user.password = hash

            const saved_user = new User(user)
            await saved_user.save()

            const match = {...userData}
            delete match.password

            const res = await request.post('/auth/login').send(loginCreds)

            expect(res.status).toBe(200)
            expect(res.body.message).toBeDefined()
            expect(res.body.user._id).toBeDefined()
            expect(res.body.user.password).not.toBeDefined()
            expect(res.body.token).toBeDefined()
            expect(res.body.user).toMatchObject(match)
        })

        it('correctly returns 401 with invalid creds', async () => {

            const user = new User(userData)
            await user.save()
            
            const match = {...userData}
            delete match.password

            const res = await request.post('/auth/login').send(invalidCreds)

            expect(res.status).toBe(401)
            expect(res.body.user).not.toBeDefined()
            expect(res.body.message).toMatch(/invalid credentials/i)
        })
    })
})