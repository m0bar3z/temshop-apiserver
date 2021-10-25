process.env.NODE_ENV = 'test'
const chai = require('chai')
let should = chai.should()
let chaiHttp = require('chai-http');
const sectionName = 'V1 Seller Home Tests'
const baseRoute = '/api/seller/v1/'
let server = require('../../../server')
const appConfig = require('config')
let register, seller, idToken, accessToken
const axios = require('axios').default;

chai.use(chaiHttp)

describe(sectionName, () => {
    before(done => {
        console.log('Waiting to ensure database connection established')
        register = appConfig.test.register
        seller = appConfig.test.sellerUser
        axios.post('http://localhost:4000/api/seller/v1/login', seller)
            .then(response =>{
                response = response.data
                
                if(response.success) {
                    idToken = response.data.idToken
                    accessToken =response.data.accessToken
                } else {
                    console.log('error! no token provided')
                }
                setTimeout(() => {
                    console.log('Okay!, lets begin')
                    done()
                }, 1000);
            })
            .catch(error => {
                console.log('error ', error)
            })
    })

    describe('Check Post APIs', () => {
        
        it('check register', async () => {
            let res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .send(register)
            res.should.have.status(200)
        })
    })
})