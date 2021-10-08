process.env.NODE_ENV = 'test'
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const sectionName = 'V1 Admin Home Test'
const baseRoute = '/api/admin/v1'
const server = require('../../../server')
const appConfig = require('config')
let register, admin, idToken, accessToken
const axios = require('axios').default

chai.use(chaiHttp)

describe(sectionName, () => {
    
    before(done => {
        console.log('Waiting to ensure database connection established!')
        register = appConfig.test.register
        admin = appConfig.test.admin
        axios.post('http://localhost:4000/api/admin/v1/login', admin)
            .then(response => {
                response = response.data
                if(response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log('error! no token provided!')
                }
                setTimeout(() => {
                    console.log('Okay! lets begin!')
                    done()
                }, 1000);
            })
            .catch(error => {
                console.log(`error! ${error}`)
            })
    })

    describe('Check Post APIs', () => {

        it('login', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/login`)
                .send(admin)
            res.should.have.status(200)
        })

    })
})