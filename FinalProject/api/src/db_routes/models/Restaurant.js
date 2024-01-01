module.exports = class {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.descrip = data.descrip;
        this.location = data.location;
        this.price = data.price;
        this.category = data.category;
        this.lon = data.lon;
        this.lat = data.lat;
        this.rating = data.rating;
    }
};
// --restaurant has id, name, description, location, price, category, long, lat
// --will need to add res_rating!!
