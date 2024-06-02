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

  async addUserManga(userId: number, mangaId: number) {
    const query = await this.db
      .prepare('INSERT INTO user_mangas (user_id, manga_id) VALUES (?, ?)')
      .bind(userId, mangaId)
      .run()
    return query.success
  }

  async getUserMangas(userId: number) {
    const query = await this.db
      .prepare('SELECT mangas.id, mangas.title, mangas.chapters, mangas.release_year, mangas.image_url, mangas.rating FROM mangas JOIN user_mangas ON mangas.id = user_mangas.manga_id WHERE user_mangas.user_id = ?')
      .bind(userId)
      .all()
    return query.results
  }
}

export default UserRepository