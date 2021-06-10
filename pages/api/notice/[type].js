import { query } from "../../../lib/db";
import { administrationList, depList } from "../../../lib/const";

const handler = async (req, res) => {
  const { type } = req.query;

  try {
    let results;
    const now = new Date().getTime();
    if (type === "all") {
      results = await query(
        `
      SELECT * from notices where notice_type='general' ORDER BY openDate DESC;
    `
      );
    }
    if (type === "whole") {
      results = await query(
        `
      SELECT * from notices ORDER BY openDate DESC;
    `
      );
    } else if (administrationList.has(type)) {
      results = await query(
        `
      SELECT * from notices where notice_type=? ORDER BY openDate DESC
    `,
        [type]
      );
    } else if (type == "active") {
      results = await query(
        `
        SELECT * from notices where notice_type='general' and openDate<? and closeDate>? and isVisible=1 ORDER BY openDate DESC`,
        [now, now]
      );
    } else if (type == "range") {
      const start = req.body.start_date;
      const end = req.body.end_date;

      results = await query(
        `
			SELECT * from notices where closeDate<=? and openDate>=? ORDER BY openDate DESC`,
        [end, start]
      ).catch((err) => console.log(err));
    } else if (depList.has(type)) {
      results = await query(
        `
      select * from notices where notice_type='department' and department=? ORDER BY openDate DESC`,
        [depList.get(type)]
      );
    }

    let array = JSON.parse(JSON.stringify(results));
    array.forEach((element) => {
      element.attachments = JSON.parse(element.attachments);
    });
    // console.log(array);
    return res.status(200).json(array);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
