process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const sectionName = 'V1 Customer Cart Tests'
const baseRoute = '/api/customer/v1/cart'
let server = require('../../../server')
let appConfig = require('config')
let customer, idToken, accessToken, cart
const axios = require('axios').default

chai.use(chaiHttp)


describe(`${sectionName}`, () => {
    before(done => {
        console.log('waiting to ensure database connection established')
        customer = appConfig.test.user1
        cart = appConfig.test.cart
        axios.post('http://localhost:4000/api/customer/v1/login', customer)
            .then(response => {
                response = response.data
                if(response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log('error! no token provided')
                }
                setTimeout(() => {
                    console.log('okay! lets begin')
                    done()
                }, 1000);
            })
            .catch(error => {
                console.log(`error: ${error}`)
            })
    })

    describe('Check Post APIs', () => {
        it('add product to cart', async () => {
            let res = await chai
                .request(server)
                .post(`${baseRoute}`)
                .set('authorization', accessToken)
                .set('idToken', idToken)
                .send(cart)
            res.should.have.status(200)
        })
    })
})