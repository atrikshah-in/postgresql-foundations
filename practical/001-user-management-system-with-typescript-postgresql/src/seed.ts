import pool, { initDb } from './config/db';
import { UserRole, UserStatus } from './models/user.model';

const seedData = [
  { username: 'john_doe', email: 'john@example.com', role: UserRole.USER, status: UserStatus.ACTIVE },
  { username: 'jane_smith', email: 'jane@example.com', role: UserRole.ADMIN, status: UserStatus.ACTIVE },
  { username: 'bob_builder', email: 'bob@example.com', role: UserRole.USER, status: UserStatus.INACTIVE },
  { username: 'alice_wonderland', email: 'alice@example.com', role: UserRole.GUEST, status: UserStatus.ACTIVE },
  { username: 'charlie_chaplin', email: 'charlie@example.com', role: UserRole.USER, status: UserStatus.BANNED },
];

const seedDatabase = async () => {
  try {
    // Ensure table exists
    await initDb();
    
    console.log('Clearing existing data...');
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

    console.log('Inserting dummy data...');
    
    const insertQuery = `
      INSERT INTO users (username, email, role, status)
      VALUES ($1, $2, $3, $4)
    `;

    for (const user of seedData) {
      await pool.query(insertQuery, [user.username, user.email, user.role, user.status]);
      console.log(`Inserted user: ${user.username}`);
    }

    console.log('✅ Dummy data seeded successfully.');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    pool.end();
  }
};

seedDatabase();
