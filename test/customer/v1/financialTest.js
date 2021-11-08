process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const sectionName = 'V1 Customer Financial Test'
const baseRoute = '/api/customer/v1/financial'
let server = require('../../../server')
let appConfig = require('config')
let customer, idToken, accessToken, orderId
let axios = require('axios').default

chai.use(chaiHttp)

describe(`${sectionName}`, () => {
    before(done => {
        console.log('Waiting to ensure database connection established')
        customer = appConfig.test.user1
        orderId = appConfig.test.orderId
        axios.post('http://localhost:4000/api/customer/v1/login', customer)
            .then(response => {
                response = response.data
                if(response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log('error! no token provided!')
                }
                setTimeout(() => {
                    console.log('ok! lets begin')
                    done()
                }, 1000);
            })
            .catch(error => {
                console.log('caught an error while trying to logging in!')
            })
    })

    describe('Check Post APIs', () => {

        it('add new payment', async () => {
            let res = await chai
                .request(server)
                .post(`${baseRoute}/payment`)
                .set('authorization', accessToken)
                .set('idtoken', idToken)

            res.should.have.status(200)
        })

        it('verify payment', async () => {
            let res = await chai
                .request(server)
                .post(`${baseRoute}/payment/verify/${orderId}`)
                .set('idtoken', idToken)
                .set('authorization', accessToken)

            res.should.have.status(200)
        })

    })
})