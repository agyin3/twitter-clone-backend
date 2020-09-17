const server = require('../../server')
const supertest = require('supertest')
const request = supertest(server)

const User = require('../../data/models/User')
const { setupDB } = require('../../utils/test_setup')


describe('AUTH INTEGRATION TESTS', () => {
    setupDB('fuschia-oxford-cheetah')

    it('is alive', async () => {
        const res = await request.get('/')

        expect(res.status).toBe(200)
    })
})