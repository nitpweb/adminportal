import { NextApiHandler } from "next";
import { query } from "../../../lib/db";
import { getSession } from "next-auth/client";

const handler = async (req, res) => {
	const session = await getSession({ req });

	if (session) {
		const { type } = req.query;
		try {
			const params = req.body;

			if (
				session.user.role === 1 ||
				(session.user.role === 2 && session.user.email == params.email)
			) {
				if (type == "notice") {
					params.attachments = JSON.stringify(params.attachments);
					params.main_attachment = JSON.stringify(params.main_attachment);
					let result = await query(
						`UPDATE notices SET title=?,timestamp=?,openDate=?,closeDate=?,important=?,` +
							`attachments=?,notice_link=?,isVisible=?,email=? WHERE id=?`,
						[
							params.title,
							params.timestamp,
							params.openDate,
							params.closeDate,
							params.important,
							params.attachments,
							params.main_attachment,
							params.isVisible,
							params.email,
							params.id,
						]
					);
					return res.json(result);
				} else if (type == "event") {
					params.attachments = JSON.stringify(params.attachments);
					params.main_attachment = JSON.stringify(params.main_attachment);

					let result = await query(
						`UPDATE events SET title=?,timestamp=?,openDate=?,closeDate=?,venue=?,event_link=?,` +
							`doclink=?,attachments=?,email=? WHERE id=?`,
						[
							params.title,
							params.timestamp,
							params.openDate,
							params.closeDate,
							params.venue,
							params.main_attachment,
							params.doclink,
							params.attachments,
							params.email,
							params.id,
						]
					);
					return res.json(result);
				} else if (type == "innovation") {
					params.image = JSON.stringify(params.image);
					let result = await query(
						`UPDATE innovation SET title=?,timestamp=?,openDate=?,closeDate=?,description=?` +
							`,image=?,author=?,email=? WHERE id=?`,
						[
							params.title,
							params.timestamp,
							params.openDate,
							params.closeDate,
							params.description,
							params.image,
							params.author,
							params.email,
							params.id,
						]
					);
					return res.json(result);
				} else if (type == "news") {
					params.image = JSON.stringify(params.image);
					let result = await query(
						`UPDATE news SET title=?,timestamp=?,openDate=?,closeDate=?,description=?` +
							`,image=?,author=?,email=? WHERE id=?`,
						[
							params.title,
							params.timestamp,
							params.openDate,
							params.closeDate,
							params.description,
							params.image,
							params.author,
							params.email,
							params.id,
						]
					);
					return res.json(result);
				}
			}
			if (
				type == "user" &&
				(session.user.role == 1 || session.user.email == params.email)
			) {
				let result = await query(
					`UPDATE users SET name=?,email=?,role=?,department=?,designation=?,ext_no=?` +
						`,research_interest=? WHERE id=?`,
					[
						params.name,
						params.email,
						params.role,
						params.department,
						params.designation,
						params.ext_no,
						params.research_interest,
						params.id,
					]
				);
				return res.json(result);
			} else {
				res.json({ message: "Could not find matching requests" });
			}
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	} else {
		res.status(403).json({ message: "You are not authorized" });
	}
};

export default handler;

// 		await query(
// 			`update events set (
// title='${params.title}',
// timestamp='${params.timestamp}',
// openDate='${params.openDate}',
// closeDate='${params.closeDate}',
//   venue='${params.venue}',
//   doclink='${params.doclink}
// important='${params.important}',
// attachments='${params.attachments}',
// email='${params.email}',
// ) where id=${params.id}`,
// 		);

// await query(
// 	`update news where (
// 	id=${params.id},
// 	title='${params.title}',
// 	timestamp='${params.timestamp}',
// 	openDate='${params.openDate}',
// 	closeDate='${params.closeDate}',
//   description='${params.description}',
//   image='${params.image}',
//   author='${params.author}',
// 	important='${params.important}',
//   email='${params.email}',
//     ) where id=${params.id}`
// );
