import db from "#db/client";
import bcrypt from 'bcrypt'

export async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const SQL =`
    INSERT INTO users
        (username, password)
    VALUES 
        ($1, $2)
    RETURNING *
    `;
    const {
        rows: [user]
    } = await db.query(SQL, [username, hashedPassword])
    return user
}

export async function getUserByUsernameAndPassword(username, password){
    const SQL =`
    SELECT *
    FROM users
    WHERE username = $1
    `;
    const{
        rows: [user]
    } = await db.query(SQL, [username])
    if(!user) return null

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return null

    return user
}

export async function getUserById(id) {
    const SQL =`
    SELECT *
    FROM users
    WHERE id = $1
    `;
    const {
        rows: [user]
    } = await db.query(SQL, [id])
    return user
}