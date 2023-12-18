
const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/CatchAsync');
const Review = require('../models/review');
const Campground = require('../models/campground');
const { validateReview } = require('../middleware');

router.post('/', validateReview, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('succes', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findOneAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;
