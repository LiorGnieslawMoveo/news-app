import sql from "better-sqlite3";

const db = sql("data.db");

db.prepare(
  `CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    content TEXT,
    date TEXT,
    image TEXT
  )`
).run();

function insertDummyData() {
  const { count } = db.prepare("SELECT COUNT(*) as count FROM news").get();

  if (count === 0) {
    const DUMMY_NEWS = [
      {
        id: "n1",
        slug: "nfl-draft-2024",
        title: "The NFL Draft 2024: What to Expect",
        image: "nfl-draft.jpg",
        date: "2024-04-01",
        content:
          "The 2024 NFL Draft is set to bring exciting new talent into the league. Fans are eagerly awaiting which top prospects will go to their favorite teams, and experts are weighing in on predictions for the first-round picks.",
      },
      {
        id: "n2",
        slug: "super-bowl-lviii",
        title: "Super Bowl LVIII: A Battle for the Ages",
        image: "super-bowl.jpg",
        date: "2024-02-10",
        content:
          "Super Bowl LVIII promises to be one of the most thrilling matchups in NFL history. With two powerhouse teams going head to head, fans can expect high-octane action, jaw-dropping plays, and an unforgettable halftime show.",
      },
      {
        id: "n3",
        slug: "top-nfl-players",
        title: "Top NFL Players of the Decade",
        image: "top-players.jpg",
        date: "2024-06-01",
        content:
          "Over the past decade, several NFL players have left an indelible mark on the game. This article highlights the careers of some of the most influential players, from record-breaking quarterbacks to unstoppable defensive stars.",
      },
      {
        id: "n4",
        slug: "nfl-injuries",
        title: "How Injuries are Impacting the 2024 NFL Season",
        image: "injuries.jpg",
        date: "2024-09-01",
        content:
          "Injuries have always played a crucial role in the NFL, and the 2024 season is no exception. We take a look at the key players sidelined by injuries and how this is affecting teams’ performances.",
      },
      {
        id: "n5",
        slug: "nfl-preseason",
        title: "NFL Preseason Highlights: Who's Ready for the Big Stage?",
        image: "preseason.jpg",
        date: "2024-08-01",
        content:
          "The NFL preseason has given fans a taste of what's to come. Several rookies and veteran players are making their mark early, but will they carry this momentum into the regular season?",
      },
      {
        id: "n6",
        slug: "nfl-draft-2023",
        title: "The NFL Draft 2023: Key Takeaways",
        image: "nfl-draft-2023.jpg",
        date: "2023-04-01",
        content:
          "The 2023 NFL Draft brought surprises and key players to the league. Teams scrambled to make the best picks, and fans are eagerly watching how these rookies perform in their first season.",
      },
      {
        id: "n7",
        slug: "super-bowl-lvi",
        title: "Super Bowl LVI: A Game for the Ages",
        image: "super-bowl-lvi.jpg",
        date: "2022-02-12",
        content:
          "Super Bowl LVI lived up to its hype, with a close game that kept fans on the edge of their seats. From incredible plays to a memorable halftime show, it was an event to remember.",
      },
    ];

    const insert = db.prepare(
      "INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)"
    );

    DUMMY_NEWS.forEach((news) => {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    });

    console.log("Dummy news data inserted.");
  }
}

insertDummyData();

// Exporting your existing functions (getAllNews, getNewsItem, etc.)
export async function getAllNews() {
  const news = db.prepare("SELECT * FROM news").all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsItem(slug) {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return newsItem;
}

export async function getLatestNews() {
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => year.year);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return years;
}

export function getAvailableNewsMonths(year) {
  const months = db
    .prepare(
      "SELECT strftime('%m', date) as month, COUNT(*) as count FROM news WHERE strftime('%Y', date) = ? GROUP BY month ORDER BY count DESC"
    )
    .all(year);

  return months.map((row) => row.month);
}

export async function getNewsForYear(year) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsForYearAndMonth(year, month) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}
