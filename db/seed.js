import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query("TRUNCATE users, tasks RESTART IDENTITY CASCADE");

  const user1 = await createUser("seededuser1", "password1")
  for (let i = 1; i <= 3; i++){
    await createTask("Task " + i, false, user1.id)
  }

  const user2 = await createUser("seededuser2", "password2")
  for (let i = 4; i <= 6; i++){
    await createTask("Task " + i, false, user2.id)
  }
}
