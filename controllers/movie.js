const movie = require('../models/movie')
const Movie = require('../models/movie')
const model = require('../model')

exports.getAllMovie = async(req, res, next) => {
    try {
        const movies = await Movie.find().limit(20) //data dibatasi hanya 20 
        // console.log('halo');

        if (!movie) {
            res.status(404).json({message: 'Data Movie not found!'})
        } 

        res.status(200).json({message: "Data movies found!", movie: movies})
    } catch (error) {
        next(error)

    }
}

exports.getMovieById = async (req, res, next) => {
    try {
        const { id } = req.params

        const movies = await Movie.findOne({movie_id: id })

        if (!movie){
            res.status(404).json({message: 'Data Movie not found!'})
        }

        res.status(200).json({message: "Found one movie!", movie: movies})
        
    } catch (error) {
        next(error)

    }
}

exports.getRecommendation = async (req, res, next) =>{
    try {
        const {userId} = req.params
        console.log();

        if (Number(userId) > 943 || Number(userId) < 0){
            res.status(500).json({
                message: 'UserId cannot more than 943 or less then 0!'
            })
        }

        const recommendations = await model.recommend(userId)

        if(!recommendations) {
            res.status(404).json({message: 'Recommeendation not found!'})
        }

        res.status(200).json({
            message: 'Recommendation Found!',
            recommendation: recommendations
        })

    } catch (error) {
        next(error)
    }
}