import { db } from '../data/connection.js';

export const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};