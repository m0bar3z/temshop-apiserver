process.env.NODE_ENV = 'test'
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const sectionName = 'V1 Admin Product Test'
const baseRoute = '/api/admin/v1/products'
const server = require('../../../server')
const axios = require('axios').default
const appConfig = require('config')
chai.use(chaiHttp)
let admin, idToken, accessToken

describe(sectionName, () => {

    before(done => {
        console.log('Waitint to ensure database connection established!')
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
                    console.log('Okay! lets begin')
                    done()
                }, 1000);
            })
            .catch(error => {
                console.log(`error: ${error}`)
            })
    })

    describe('Check Get APIs', () => {

        it('get products list', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
            res.should.have.status(200)
        })

    })

    describe('Check Post APIs', () => {
        
        it('add product', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
            res.should.have.status(200)
        })
        
    })

    describe('Check Put APIs', () => {

        it('edit product detaild', async () => {
            const res = await chai
                .request(server)
                .put(`${baseRoute}/test`)
            res.should.have.status(200)
        })

    })

    describe('Check Delete APIs', () =>{ 

        it('delete product', async () => {
            const res = await chai
                .request(server)
                .delete(`${baseRoute}/test`)
            res.should.have.status(200)
        })

    })

    after(async () => {
        console.log(`Section ${sectionName} finished`)
    })

})