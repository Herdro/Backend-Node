const MongoLib = require('../lib/mongo');

class MoviesService {
    constructor() {
        this.collection = 'movies';
        this.mongoDB = new MongoLib();
    }
    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags }};
        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieId }) {
        const movies = await this.mongoDB.get(this.collection, movieId);
        return movies || {};
    }

    async createMovies({ movie }) {
        const createdMoviesId = await this.mongoDB.create(this.collection, movie);
        return createdMoviesId;
    }

    async updateMovies({ movieId, movie } = {}) {
        const updatedMoviesId = await this.mongoDB.create(this.collection, movieId, movie);
        return updatedMoviesId;
    }

    async deleteMovies({ movieId }) {
        const deletedMoviesId = await this.mongoDB.delete(this.collection, movieId);
        return deletedMoviesId;
    }
}
module.exports = MoviesService