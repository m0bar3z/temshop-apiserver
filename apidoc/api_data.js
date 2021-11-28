define({ "api": [
  {
    "type": "post",
    "url": "/api/admin/v1/products",
    "title": "AddProduct",
    "version": "1.0.0",
    "name": "AddProduct",
    "description": "<p>add product api for admin</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "name",
            "description": "<p>product name</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "price",
            "description": "<p>product price</p>"
          },
          {
            "group": "Parameter",
            "type": "file[]",
            "optional": false,
            "field": "image",
            "description": "<p>product images should be png/jpeg and maximum number of product photos is 4</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"new product added\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"invalid file(s)!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/admin/v1/product.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/admin/v1/login",
    "title": "Login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login api for admin</p>",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"logged in successfully\",\n    data: {\n         idToken: idToken, \n         accessToken: accessToken\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"username not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/admin/v1/home.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/customer/v1/payment",
    "title": "AddNewPayment",
    "version": "1.0.0",
    "name": "addPayment",
    "description": "<p>add new payment</p>",
    "group": "Customer",
    "success": {
      "examples": [
        {
          "title": "Success-Response :",
          "content": "{\n success: true,\n message: \"new payment successfully created\",\n data: {\n     orderId: \"TEM-12345\",\n     link: \"https://idpay.ir/payment\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n success: false,\n message: \"cart is empty!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/financial.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/api/customer/v1/cart",
    "title": "AddToCart",
    "version": "1.0.0",
    "name": "addToCart",
    "description": "<p>add new product to cart</p>",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "productId",
            "description": "<p>ObjectId of product</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity of product must be between 1 and 5</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "seller",
            "description": "<p>seller's username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response :",
          "content": "{\n success: true,\n message: \"product added to cart\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n success: false,\n message: \"total product quantity is more than 5!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/cart.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/api/seller/v1/login",
    "title": "Login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login api for customer</p>",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"Logged in successfully\",\n    data: {\n         idToken: idToken, \n         accessToken: accessToken\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"username not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/home.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/api/customer/v1",
    "title": "Register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register new customer</p>",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>phone number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"registered successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"username or mobile is taken!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/home.js",
    "groupTitle": "Customer"
  },
  {
    "type": "put",
    "url": "/api/customer/v1/payment/reset/:orderId",
    "title": "ResetPayment",
    "version": "1.0.0",
    "name": "resetPayment",
    "description": "<p>reset customer payment and return new payment link</p>",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response :",
          "content": "{\n success: true,\n message: \"reset the payment,\n data: {\n     orderId: \"TEM-12345\",\n     link: \"https://idpay.ir/payment\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n success: false,\n message: \"payment has been verified!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/financial.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/api/customer/v1/payment/verify/:orderId",
    "title": "VerifyPayment",
    "version": "1.0.0",
    "name": "verifyPayment",
    "description": "<p>verify customer payment</p>",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response :",
          "content": "{\n success: true,\n message: \"payment is verified successfully\",\n data: idPayResponse\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n success: false,\n message: \"امکان تایید پرداخت وجود ندارد\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/customer/v1/financial.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/api/seller/v1/financial/card",
    "title": "AddCardNumber",
    "version": "1.0.0",
    "name": "addCardNumber",
    "description": "<p>add seller's card number</p>",
    "group": "Seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "cardNum",
            "description": "<p>seller card number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  success: true,\n  message: \"card number added successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  success: false,\n  message: \"card number has been added!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/financial.js",
    "groupTitle": "Seller"
  },
  {
    "type": "post",
    "url": "/api/seller/v1/products",
    "title": "AddProduct",
    "version": "1.0.0",
    "name": "addProduct",
    "description": "<p>add product to store page</p>",
    "group": "Seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "productId",
            "description": "<p>product objectId from database</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "newPrice",
            "description": "<p>new price for seller's store page</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  success: true,\n  message: \"product added to store page\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  success: false,\n  message: \"product not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/products.js",
    "groupTitle": "Seller"
  },
  {
    "type": "delete",
    "url": "/api/seller/v1/financial/card",
    "title": "DeleteCardNumber",
    "version": "1.0.0",
    "name": "deleteCardNumber",
    "description": "<p>delete seller's card number</p>",
    "group": "Seller",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  success: true,\n  message: \"card number removed!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  success: false,\n  message: \"card number field is empty!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/financial.js",
    "groupTitle": "Seller"
  },
  {
    "type": "delete",
    "url": "/api/seller/v1/products/:id",
    "title": "DeleteProduct",
    "version": "1.0.0",
    "name": "deleteProduct",
    "description": "<p>delete product frome store page</p>",
    "group": "Seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "id",
            "description": "<p>product objectId from database</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  success: true,\n  message: \"product removed from store\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  success: false,\n  message: \"product is not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/products.js",
    "groupTitle": "Seller"
  },
  {
    "type": "put",
    "url": "/api/seller/v1/financial/card/:num",
    "title": "EditCardNumber",
    "version": "1.0.0",
    "name": "editCardNumber",
    "description": "<p>edit seller's card number</p>",
    "group": "Seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "num",
            "description": "<p>seller card number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  success: true,\n  message: \"card number edited\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  success: false,\n  message: \"card number field is empty!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/financial.js",
    "groupTitle": "Seller"
  },
  {
    "type": "get",
    "url": "/api/seller/v1/financial/card",
    "title": "GetCardNumber",
    "version": "1.0.0",
    "name": "getCardNumber",
    "description": "<p>get seller's card number</p>",
    "group": "Seller",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  success: true,\n  message: \"card number is found!\",\n  data: {\n    _id: \"123456789\",\n    bankId: \"123456789\"  \n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  success: false,\n  message: \"card number field is empty\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/financial.js",
    "groupTitle": "Seller"
  },
  {
    "type": "get",
    "url": "/api/seller/v1/products/",
    "title": "GetProducts",
    "version": "1.0.0",
    "name": "getProducts",
    "description": "<p>get product list</p>",
    "group": "Seller",
    "success": {
      "examples": [
        {
          "title": "Success-Response: ",
          "content": "{\n  success: true,\n  message: \"active productList is ready\",\n  data: [\n     {\n       _id: \"1234567890\",\n       name: \"product 1\",\n       price: \"20000\",\n       images: [\n         \"http://upload.temshop.ir./products/image.png\"\n       ],\n       newPrice: \"25000\"\n     }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/products.js",
    "groupTitle": "Seller"
  },
  {
    "type": "post",
    "url": "/api/seller/v1/login",
    "title": "Login",
    "version": "1.0.0",
    "name": "login",
    "description": "<p>login api for seller</p>",
    "group": "Seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"Logged in successfully\",\n    data: {\n         idToken: idToken, \n         accessToken: accessToken\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"username not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/home.js",
    "groupTitle": "Seller"
  },
  {
    "type": "post",
    "url": "/api/seller/v1",
    "title": "Register",
    "version": "1.0.0",
    "name": "register",
    "description": "<p>register new seller</p>",
    "group": "Seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "username",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "mobile",
            "description": "<p>phone number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success: true,\n    message: \"registered successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n     success: false,\n     message: \"username or mobile is taken!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/home.js",
    "groupTitle": "Seller"
  },
  {
    "type": "put",
    "url": "/api/seller/v1/products/:id/price/:newPrice",
    "title": "UpdateProductPrice",
    "version": "1.0.0",
    "name": "updateProductPrice",
    "description": "<p>update product price</p>",
    "group": "Seller",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "id",
            "description": "<p>product id</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "newPrice",
            "description": "<p>product new price</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   success: true,\n   message: \"product price is modified\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-response:",
          "content": "{\n   success: false, \n   message: \"product is not available\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/seller/v1/products.js",
    "groupTitle": "Seller"
  }
] });
