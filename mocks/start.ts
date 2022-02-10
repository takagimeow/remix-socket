import { rest } from "msw";
import { setupServer } from "msw/node";

import { isE2E } from "./utils";

// put one-off handlers that don't really need an entire file to themselves here
const miscHandlers = [
	rest.get("http://localhost:3000/api/post/:postId", async (req, res, ctx) => {
		console.log("req: ", req);
		const { postId } = req.params;
		return res(
			ctx.json({
				post: {
					id: postId || "",
					uid: "user-id",
					picture: "",
					text: "こんにちわ",
					createdAt: new Date()
				}
			})
		);
	})
];

const server = setupServer(...miscHandlers);

server.listen({ onUnhandledRequest: "warn" });
console.info("🔶 Mock server installed");
if (isE2E) console.info("running in E2E mode");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
