const asyncHandler = require('express-async-handler');
const Chef = require("../models/Chef");
const { responseHandler } = require("../helpers/helper");

exports.getChefs = asyncHandler(async (req, res) => {
    const chefs = await Chef.find({});

    responseHandler(
        res,
        true,
        200,
        null,
        chefs
    );
});

exports.createChef = asyncHandler(async (req, res) => {
    const chef = await Chef.create(req.body);

    responseHandler(
        res,
        true,
        200,
        'Chef created successfully!',
        chef
    );
});

exports.deleteChef = asyncHandler(async (req, res) => {
    const chef = await Chef.findById(req.params.id);

    if (chef) {
        await chef.remove();

        responseHandler(
            res,
            true,
            200,
            'Chef removed successfully!'
        );
    } else {
        responseHandler(
            res,
            false,
            404,
            'Chef not found',
        );
    }
});

exports.getChefById = asyncHandler(async (req, res) => {
    const chef = await Chef.findById(req.params.id);

    if (chef) {
        responseHandler(
            res,
            true,
            200,
            null,
            chef
        );
    } else {
        responseHandler(
            res,
            false,
            404,
            'Chef not found',
        );
    }
})

exports.updateChef = asyncHandler(async (req, res) => {
    const chef = await Chef.findById(req.params.id)

    if (chef) {
        chef.name = req.body.name;
        chef.imgUrl = req.body.imgUrl;
        chef.biography = req.body.biography;
        chef.country = req.body.country;
        chef.sumScore = req.body.sumScore || chef.sumScore;
        chef.totalScore = req.body.totalScore || chef.totalScore;

        const updatedChef = await chef.save()

        responseHandler(
            res,
            true,
            200,
            'Chef updated successfully!',
            updatedChef
        );
    } else {
        responseHandler(
            res,
            false,
            404,
            'Chef not found',
        );
    }
});

exports.rateChef = asyncHandler(async (req, res) => {
    const chef = await Chef.findById(req.params.id)

    if (chef) {
        chef.sumScore += req.body.rate;
        chef.totalScore += 1;

        const updatedChef = await chef.save()

        responseHandler(
            res,
            true,
            200,
            'Chef rated successfully!',
            updatedChef
        );
    } else {
        responseHandler(
            res,
            false,
            404,
            'Chef not found',
        );
    }
});