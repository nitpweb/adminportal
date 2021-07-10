import { query } from "../../../lib/db";

const handler = async (req, res) => {
  const { type } = req.query;
  try {
    let results;
    const now = new Date().getTime();
    results = await query(
      `
      SELECT * from webteam
    `
    );
    let array = JSON.parse(JSON.stringify(results));

    return res.json(array);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export default handler;
