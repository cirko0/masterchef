import express from "express";
import dotenv from "dotenv";
import db from "./config/db.config";
import morgan from "morgan";
import { ai } from "./config/ai.config";
import recipes from "./services/recipes";
import { Response } from "express-serve-static-core";
import { Clerk } from "@clerk/clerk-sdk-node";

dotenv.config();

interface AuthenticatedRequest extends Request {
  auth?: {
    sessionId?: string;
    userId?: string;
  };
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const host = process.env.HOST || "127.0.0.1";

const app = express();

const apiKey: string = process.env.CLERK_API_KEY || "";

//@ts-ignore
const clerk = new Clerk({ apiKey });

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "accept, authorization, content-type, x-requested-with"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// Utilities

const unauthenticated = (res: Response) => {
  res.statusCode = 401;
  res.json({ code: 401, msg: "session expired or invalid" });
};

app.get("/api/v1/dalle", async (next: any) => {
  const res = await ai.gpt([{ role: "user", content: "Hi ChatGPT" }]);
  console.log(res);
  next();
});

app.get("/api/v1/recipes/:skip/:limit", async (req, res) => {
  const retrivedData = await recipes.get({
    skip: +req.params.skip,
    limit: +req.params.limit,
  });
  res.statusCode = retrivedData.code;

  res.json(retrivedData.data);
});

app.put(
  "/api/v1/recipes",
  clerk.expressWithAuth({}),
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.auth?.sessionId) return unauthenticated(res);

    const user = await clerk.users.getUser(req.auth?.userId);
    req.body.author = `${user.firstName} ${user.lastName}`;
    req.body.userId = user.id;

    const response = await recipes.update(req.body);
    res.statusCode = response.code;
    res.json(response);
  }
);

app.listen(port, host, async () => {
  console.log("\x1b[33m→ Connecting to Database...\x1b[0m");
  try {
    await db.connect();
    console.log("\x1b[32m → Connected.\x1b[0m");
    console.log(`\x1b[32mMasterChef API listening on port ${port}\x1b[0m`);
  } catch (error) {
    console.error("\x1b[31mError connecting to the database:\x1b[0m", error);
  }
});
