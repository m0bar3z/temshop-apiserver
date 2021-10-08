process.env.NODE_ENV = 'test'
let chai = require('chai')
let should = chai.should()
let chaiHttp = require('chai-http')
const sectionName = 'V1 customer home tests';
const baseRoute = '/api/customer/v1'
let server = require('../../../server')
let appConfig = require('config')
let customer, register, idToken, accessToken
const axios = require('axios').default;

chai.use(chaiHttp)

describe(`${sectionName}`, () => {
    before(done => {
        console.log('waiting to exnsure database connection established')
        register = appConfig.test.register
        customer = appConfig.test.user1
        axios.post('http://localhost:4000/api/customer/v1/login', customer)
            .then((response) => {
                response = response.data
                if(response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log('error: no token provided')
                }
                setTimeout(() => {
                    console.log('Okay, lets begin!')
                    done()
                }, 1000);
            })
            .catch(error => {
                console.log('error', error)
            })
    })

    describe('Check Post APIs', () => {
        it('check register', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .send(register)
            res.should.have.status(200)
        })
    })
}) 