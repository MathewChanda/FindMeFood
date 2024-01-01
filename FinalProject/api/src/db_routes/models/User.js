const crypto = require("crypto");
// code mostly pulled from lec21 by Dr. Dominguez
module.exports = class {
    #passwordHash;
    #salt;

    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.#salt = data.salt;
        this.#passwordHash = data.password;
    }

    validatePassword(password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(
                password,
                this.#salt,
                100000,
                64,
                "sha512",
                (err, derivedKey) => {
                    if (err) {
                        //problem computing digest, like hash function not available
                        reject("Error: " + err);
                    }

                    //might have to turn to base64url?
                    const digest = derivedKey.toString("hex");
                    if (this.#passwordHash == digest) {
                        resolve(this);
                    } else {
                        reject("Invalid username or password");
                    }
                }
            );
        });
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
        };
    }
};
