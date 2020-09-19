require('dotenv').config()
const User = require('../../data/models/User')
const { setupDB } = require('../../utils/test_setup')
const userData = {
    username: 'king_cobra33', 
    password: 'test1234', 
    name: 'John Johnson', 
    phone: '555555555', 
    email: 'john_john@example.com'
}

describe('User Model Test', () => {
    it('Is Alive', () => {
        expect(1).toBe(1)
    })

    setupDB('zulu-pele-yale')

    it('create & save user successfully', async () => {
        const validUser = await new User(userData)
        const savedUser = await validUser.save()

        expect(savedUser._id).toBeDefined()
        expect(savedUser.name).toBe(userData.name)
        expect(savedUser.phone).toBe(userData.phone)
        expect(savedUser.email).toBe(userData.email)
        expect(savedUser.username).toBe(userData.username)
        expect(savedUser.password).toBe(userData.password)
    })
})