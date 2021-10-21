process.env.NODE_ENV = 'test'
const chai = require('chai')
let should = chai.should()
let chaiHttp = require('chai-http');
const sectionName = 'V1 Seller Home Tests'
const baseRoute = '/api/seller/v1/products'
let server = require('../../../server')
const appConfig = require('config')
let seller, idToken, accessToken, addProduct, productId
const axios = require('axios').default;

chai.use(chaiHttp)

describe(sectionName, () => {
    before(done => {
        console.log('Waiting to ensure database connection established')
        seller = appConfig.test.sellerUser
        addProduct = appConfig.test.sellerProduct    
        productId = appConfig.test.productId    
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
        
        it('add product', async () => {
            let res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .set('authorization', accessToken)
                .set('idToken', idToken)
                .send(addProduct)
            
            res.should.have.status(200)
        })

        it('delete product', async () => {
            let res = await chai
                .request(server)
                .delete(`${baseRoute}/${productId}`)
                .set('authorization', accessToken)
                .set('idToken', idToken)

            res.should.have.status(200)    
        })
    })
})