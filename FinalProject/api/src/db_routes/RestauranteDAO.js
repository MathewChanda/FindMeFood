const db = require("./DBConnection");
const Restaurant = require("./models/Restaurant");

//assuming no filters were placed
//Q: these restaurants will automatically within radius?
function getRestaurants() {
    return db.query("SELECT * FROM restaurants").then(({ results }) => {
        return results.map((res) => new Park(res));
    });
}

//looking up a restaurant by name?
function getRestaurantByName(name) {
    return db
        .query("SELECT * FROM restaurants WHERE res_name=?", [name])
        .then(({ results }) => {
            if (results[0]) return new Restaurant(results[0]);
        });
}

//looking up a restaurant by category
function getRestaurantByCategory(category) {
    return db
        .query("SELECT * FROM restaurants WHERE res_category=?", [category])
        .then(({ results }) => {
            if (results[0]) return new Restaurant(results[0]);
        });
}

//looking up a restaurant by price
function getRestaurantByPrice(price) {
    return db
        .query("SELECT * FROM restaurants WHERE res_price=?", [price])
        .then(({ results }) => {
            if (results[0]) return new Restaurant(results[0]);
        });
}

// function createPark(park) {
//     return db
//         .query(
//             "INSERT INTO park (par_id, par_name, par_lat, par_lon) VALUES (?, ?, ?, ?)",
//             [park.id, park.name, park.lat, park.lon]
//         )
//         .then(({ results }) => {
//             getParkById(results.insertId);
//         });
// }

module.exports = {
    getRestaurants: getRestaurants,
    getRestaurantByName: getRestaurantByName,
    getRestaurantByCategory: getRestaurantByCategory,
    getRestaurantByPrice: getRestaurantByPrice,
};
