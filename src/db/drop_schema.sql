-- npx wrangler d1 execute tobimanga --local --file=src/db/drop_schema.sql

-- Drop the user_read_chapters table
DROP TABLE IF EXISTS user_read_chapters;

-- Drop the user_mangas table
DROP TABLE IF EXISTS user_mangas;

-- Drop the chapters table
DROP TABLE IF EXISTS chapters;

-- Drop the manga_genres table
DROP TABLE IF EXISTS manga_genres;

-- Drop the mangas table
DROP TABLE IF EXISTS mangas;

-- Drop the genres table
DROP TABLE IF EXISTS genres;

-- Drop the users table
DROP TABLE IF EXISTS users;
