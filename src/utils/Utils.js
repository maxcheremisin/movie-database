export class Utils {
    static sortByDate(movieA, movieB) {
        let dateB = movieB.release_date ? movieB.release_date.split('-')[0] : 0;
        let dateA = movieA.release_date ? movieA.release_date.split('-')[0] : 0;

        return dateB - dateA;
    }

    static sortByRating(movieA, movieB) {
        return movieB.vote_average - movieA.vote_average;
    }
}
