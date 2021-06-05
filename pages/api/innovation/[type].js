import { query } from "../../../lib/db";

const handler = async (req, res) => {
  const { type } = req.query;

  try {
    let results;
    const now = new Date().getTime();
    if (type === "all") {
      results = await query(
        `
      SELECT * from innovation ORDER BY openDate DESC
    `
      );
    } else if (type == "active") {
      results = await query(
        `
        SELECT * from innovation where openDate<? and closeDate>? ORDER BY openDate DESC`,
        [now,now]
      );
    } else if (type == "range") {
      const start = req.body.start_date;
      const end = req.body.end_date;

      results = await query(
        `
			SELECT * from innovation where closeDate<=? and openDate>=? ORDER BY openDate DESC`,
        [end, start]
      ).catch((err) => console.log(err));
    }
    let array = JSON.parse(JSON.stringify(results));
    array.forEach((element) => {
      element.image = JSON.parse(element.image);
    });
    // console.log(array);
    return res.status(200).json(array);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
