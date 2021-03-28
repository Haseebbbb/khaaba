const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Chef = require('../models/chef')
const Kitchen = require('../models/kitchen')
const config = require('config')
const axios = require('axios')
const multer = require('multer')
const path = require('path')
const chef = require('../models/chef')
const kitchen = require('../models/kitchen')
const {
    SERVER_ERROR,
    INVALID_CREDITS
} = require('../utils/errors')


router.get('/order-history', auth, async (req, res) => {

    console.log(req.user)
    let userObject = await Chef.findOne({
        _id: req.user.id//"60573d5785214d0bc5b0f9b7"//req.user.id//
    })
    if (!userObject) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
    let kitchenID = userObject.kitchen
    console.log(kitchenID)

    let chefKitchen = await kitchen.findOne({
        _id: kitchenID
    })
    if (!chefKitchen) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }



    return res.status(200).json({
        activeOrders: chefKitchen.activeOrders,
        oldOrders: chefKitchen.completeOrders
    })
})

router.get('/active-orders', auth, async (req, res) => {

    let user = await Chef.findOne({
        _id: req.user.id//"60573d5785214d0bc5b0f9b7"//req.user.id
    })
    if (!user) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }
    let kitchenID = user.kitchen
    console.log(kitchenID)

    let chefKitchen = await kitchen.findOne({
        _id: kitchenID
    })
    if (!chefKitchen) {
        return res.status(400).json({
            errors: [SERVER_ERROR]
        })
    }


    return res.status(200).json({
        activeOrders: chefKitchen.activeOrders,
    })
})


module.exports = router