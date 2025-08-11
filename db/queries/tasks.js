import db from "#db/client";

export async function createTask(title, done, user_id){
    const SQL =`
    INSERT INTO tasks
        (title, done, user_id)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;
    const {
        rows: [task]
    } = await db.query(SQL, [title, done, user_id])
    return task
}

export async function getTasks(){
    const SQL =`
    SELECT *
    FROM tasks
    `;
    const { rows: tasks } = await db.query(SQL)
    return tasks
}