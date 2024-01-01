const db = require("./DBConnection");
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");

function getUserByCredentials(username, password) {
    return db
        .query("SELECT * FROM user WHERE user_name=?", [username])
        .then(({ results }) => {
            const user = new User(results[0]);
            if (user) {
                // we found our user
                return user.validatePassword(password);
            } else {
                // if no user with provided username
                throw new Error("No such user");
            }
        });
}

//retrive all the favorites of the user
function getFavorites(userId) {
    return db
        .query("SELECT * FROM user_fav WHERE fav_user_id=?, [userId]")
        .then(({ results }) => {
            return results.map((res) => new Restaurant(res));
        });
}

//add a restaurant to their favorites
function addRestaurantToFavorites(user, restaurant) {
    return db
        .query("INSERT INTO user_fav (fav_res_id, fav_user_id) VALUES (?, ?)", [
            user.id,
            restaurant.id,
        ])
        .then(({ results }) => {
            return;
        });
}

module.exports = {
    getUserByCredentials: getUserByCredentials,
    getFavorites : getFavorites 
};
