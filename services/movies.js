const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
    async getMovies() {
        const movies = await Promise.resolve(moviesMock);
        return movies || [];
    }

    async getMovie() {
        const movies = await Promise.resolve(moviesMock[0]);
        return movies || {};
    }

    async createMovies() {
        const createdMoviesId = await Promise.resolve(moviesMock[0].id);
        return createdMoviesId;
    }

    async updateMovies() {
        const updatedMoviesId = await Promise.resolve(moviesMock[0].id);
        return updatedMoviesId;
    }

    async deleteMovies() {
        const deletedMoviesId = await Promise.resolve(moviesMock[0].id);
        return deletedMoviesId;
    }
}
module.exports = MoviesService