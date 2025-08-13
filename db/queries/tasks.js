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

export async function getTaskById(id) {
  const SQL = `
  SELECT *
  FROM tasks
  WHERE id = $1
  `;
  const {
    rows: [task],
  } = await db.query(SQL, [id]);
  return task;
}

export async function updateTask(id, { title, done }) {
 const SQL =`
 UPDATE tasks
 SET title = $2, done = $3
 WHERE id = $1
 RETURNING *
 `;
 const { 
    rows: [task],
} = await db.query(SQL, [id, title, done])
return task
}

export async function deleteTask(id) {
    const SQL =`
    DELETE tasks
    WHERE id = $1
    RETURNING *
    `;
    const {
        rows: [task],
    } = await db.query(SQL, [id])
    return task
}