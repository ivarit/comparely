const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.handleSearch = functions.https.onRequest(async (req, res) => {
  const { query } = req.body;
  const snapshot = await db.collection("scrapedProducts").where("name", "==", query).get();
  if (snapshot.empty) {
    await db.collection("productsToScrape").add({ name: query, timestamp: Date.now() });
    return res.json({ message: "Product not found. Added to scrape queue." });
  }
  const results = [];
  snapshot.forEach(doc => results.push(doc.data()));
  res.json(results);
});

exports.scrapeProducts = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const queue = await db.collection("productsToScrape").get();
  for (const doc of queue.docs) {
    const product = doc.data();
    await db.collection("scrapedProducts").add({
      name: product.name,
      price: Math.floor(Math.random() * 100),
      retailer: "Demo Retailer",
      timestamp: Date.now()
    });
    await doc.ref.delete();
  }
  console.log("Scraped products updated.");
});
