const Pool = require("../config/db");

const getAllRecipes = async () => {
    console.log("model getAllRecipes");
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipes`, (err, result) => {
            if (!err) {
                return resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const getRecipeById = async (id) => {
    console.log("model getRecipeById");
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM recipes WHERE id=${id}`, (err, result) => {
            if (!err) {
                return resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const deleteRecipeById = async (id) => {
    console.log("model deleteRecipeById");
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM recipes WHERE id=${id}`, (err, result) => {
            if (!err) {
                return resolve(result);
            } else {
                reject(err);
            }
        })
    );
};

const postRecipe = async (data) => {
    console.log("model postRecipe");
    let { title, content } = data;
    return new Promise((resolve, reject) =>
        Pool.query(
            `INSERT INTO recipes (title, content) VALUES('${title}','${content}')`,
            (err, result) => {
                if (!err) {
                    return resolve(result);
                } else {
                    reject(err);
                }
            }
        )
    );
};

const putRecipe = async (data) => {
    console.log("model putRecipe");
    let { id, title, content } = data;
    return new Promise((resolve, reject) =>
        Pool.query(
            `UPDATE recipes SET title='${title}', content='${content}' WHERE id=${id}`,
            (err, result) => {
                if (!err) {
                    return resolve(result);
                } else {
                    reject(err);
                }
            }
        )
    );
};

module.exports = {
    getAllRecipes,
    postRecipe,
    putRecipe,
    getRecipeById,
    deleteRecipeById,
};
