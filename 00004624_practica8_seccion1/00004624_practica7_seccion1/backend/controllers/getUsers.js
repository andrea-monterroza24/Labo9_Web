import { db } from "../data/connection.js";

export const getUsers = async (req, res) => {
    const { order } = req.query;
    if (order === "asc") return await getUsersAsc(req, res);
    await getUsersDesc(req, res);
}

export const getUsersDesc = (request, response) => {
    db.query('SELECT * FROM users ORDER BY name DESC', (error, results) => {
        if (error) {
            throw error;
        }
        const resultsFind = results.rows;
        const resultsLength = resultsFind.length ?? 0;

        return response.status(200).json({
            success: true,
            message: `users finded: ${resultsLength}`,
            data: resultsFind
        });
    });
};

export const getUsersAsc = (request, response) => {
    db.query("SELECT * FROM users ORDER BY name ASC",
        async (error, results) => {
            if (error) {
                throw error;
            }
            const resultsFind = results.rows;
            const resultsLength = resultsFind.length ?? 0;
            return response.status(200).json({
                success: true,
                message: `users finded: ${resultsLength}`,
                data: resultsFind
            });
        });
};

export const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};