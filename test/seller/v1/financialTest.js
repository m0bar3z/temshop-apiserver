process.env.NODE_ENV = 'test'
const chai = require('chai')
const should = chai.should()
const chaiHttp =require('chai-http')
const sectionName = 'V1 Seller Financial Test'
const baseRoute = '/api/seller/v1/financial'
let server = require('../../../server')
const appConfig = require('config')
const axios = require('axios').default

let cardNumber, seller, idToken, accessToken

chai.use(chaiHttp)

describe(`${sectionName}`, () => {
    before(done => {
        console.log('waiting to ensure database connection established')
        seller = appConfig.test.sellerUser
        cardNumber = appConfig.test.sellerCardNumber
        axios.post('http://localhost:4000/api/seller/v1/login', seller)
            .then(response => {
                response = response.data
                if(response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log('error! no token provided!')
                }
                setTimeout(() => {
                    console.log("ok! lets begin")
                    done()
                }, 1000);
            })
            .catch(error => {
                console.log(`login error: ${error}`)
            })
    })


    describe('Check Get APIs', () => {

        it('get card number', async () => {
            let res = await chai
                .request(server)
                .get(`${baseRoute}/card`)
                .set('authorization', accessToken)
                .set('idtoken', idToken)

            res.should.have.status(200)
        })

    })

    describe('Check Post APIs', () => {

        it('add card number', async () => {
            let res = await chai
                .request(server)
                .post(`${baseRoute}/card`)
                .set('authorization', accessToken)
                .set('idtoken', idToken)
                .send(cardNumber)

            res.should.have.status(200)
        })

    })

    describe('Check Put APIs', () => {
        
        it('edit card number', async () => {
            let res = await chai 
                .request(server)
                .put(`${baseRoute}/card/${cardNumber.cardNum}`)
                .set('authorization', accessToken)
                .set('idtoken', idToken)
               
            res.should.have.status(200)
        })

    })

    describe('Check Delete APIs', () => {
        it('remove card number', async () => {
            let res = await chai
                .request(server)
                .delete(`${baseRoute}/card`)
                .set('authorization', accessToken)
                .set('idtoken', idToken)

            res.should.have.status(200)
        })
    })
})