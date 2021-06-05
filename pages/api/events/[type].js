import { query } from "../../../lib/db";

const handler = async (req, res) => {
  const { type } = req.query;

  try {
    let results;
    const now = new Date().getTime();
    if (type === "all") {
      results = await query(
        `
      SELECT * from events
    `
      );
    } else if (type == "active") {
      results = await query(
        `SELECT * from events where openDate<? and closeDate>?`,
        [now,now]
      );
    } else if (type == "range") {
      const start = req.body.start_date;
      const end = req.body.end_date;

      results = await query(
        `
			SELECT * from events where closeDate<=? and openDate>=?`,
        [end, start]
      ).catch((err) => console.log(err));
    }
    let array = JSON.parse(JSON.stringify(results));
    array.forEach((element) => {
      element.attachments = JSON.parse(element.attachments);
    });

    // console.log(array);
    return res.json(array.reverse());
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
