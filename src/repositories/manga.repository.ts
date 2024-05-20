class MangaRepository {
  private db: D1Database

  constructor(db: D1Database) {
    this.db = db
  }

  async getAllMangas() {
    const query = await this.db.prepare('SELECT * FROM mangas ORDER BY created_at DESC LIMIT 10').all()
    return query.results
  }

  async getMangaById(id: number) {
    const result = await this.db.prepare('SELECT * FROM mangas WHERE id = ?').bind(id)
    return result
  }
}

export default MangaRepository