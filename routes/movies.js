const express = require('express');
const MoviesService = require('../services/movies');

const {
    movieIdSchema,
    createMoviesSchema,
    updateMoviesSchema
} = require('../utils/schema/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get("/", async function (req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags })
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get("/:movieId", validationHandler({ moviesId: movieIdSchema}, 'params'), async function (req, res, next) {
        const { moviesId } = req.params;

        try {
            const movies = await moviesService.getMovie({ moviesId });

            res.status(200).json({
                data: movies,
                message: 'movies retrive'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/", validationHandler(createMoviesSchema), async function (req, res, next) {
        const { body: movie } = req;

        try {
            const createdMoviesId = await moviesService.createdMovies({ movie });

            res.status(201).json({
                data: createdMoviesId,
                message: 'movies created'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/:movieId", validationHandler({ moviesId: movieIdSchema}, 'params'), validationHandler(updateMoviesSchema), async function (req, res, next) {
        const { moviesId } = req.params;
        const { body: movie } = req;
        try {
            const updateMoviesId = await moviesService.updateMovies({ moviesId, movie});

            res.status(200).json({
                data: updateMoviesId,
                message: 'movies update'
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete("/:movieId", validationHandler({ moviesId: movieIdSchema}, 'params'), async function (req, res, next) {
        const { moviesId } = req.params;
        try {
            const deleteMoviesId = await moviesService.deleteMovies({ moviesId });

            res.status(200).json({
                data: deleteMoviesId,
                message: 'movies deleted'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = moviesApi;
