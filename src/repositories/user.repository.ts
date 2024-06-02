import { CreateUserDto } from '../dtos/user'
const bcrypt = require('bcryptjs')

class UserRepository {
  private db: D1Database

  constructor(db: D1Database) {
    this.db = db
  }

  async createUser(user: CreateUserDto) {
    const { username, email, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const query = await this.db
      .prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)')
      .bind(username, email, hashedPassword)
      .run()
    return query.success
  }

  async existsUserByEmail(email: string) {
    const query = await this.db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first()
    return query
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }
}

export default UserRepository