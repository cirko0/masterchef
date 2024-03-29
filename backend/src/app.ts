import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./config/db.config";
import morgan from "morgan";
import recipes from "./services/recipes";
import { Clerk } from "@clerk/clerk-sdk-node";
import multer from "multer";
// @ts-ignore
import uploadcareStorage from "multer-storage-uploadcare";
import search from "./services/search";
import submissions from "./services/submissions";
import { Image } from "./interfaces/services/recipes.interface";

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const host = process.env.HOST || "127.0.0.1";

const app: Application = express();

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://masterchef-ai.netlify.app",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.setHeader("Access-Control-Allow-Origin", origin as string);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "accept, authorization, content-type, x-requested-with"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// Utilities

interface RequestWithClerkAuth extends Request {
  auth?: {
    sessionId: string;
    userId: string;
  };
}

const upload = multer({
  storage: uploadcareStorage({
    public_key: process.env.UPLOADCARE_PUBLIC_KEY,
    private_key: process.env.UPLOADCARE_SECRET_KEY,
  }),
}).single("image");

const unauthenticated = (res: Response) => {
  res.statusCode = 401;
  res.json({ code: 401, msg: "session expired or invalid" });
};

let startTime: Date | null = new Date(Date.now());

app.get("/status", async (req: Request, res: Response) => {
  if (startTime) {
    res.json({
      code: 200,
      name: "NinjaChefs + AI (API)",
      status: `Operational`,
      startTime: `${startTime.toLocaleString("en-CA")} (Server Time - UTC)`,
    });
  } else {
    res.statusCode = 500;
    res.json({
      code: 500,
      name: "NinjaChefs + AI (API)",
      status: `Requires Attention`,
    });
  }
});

app.get("/api/v1/recipes/:skip/:limit", async (req: Request, res: Response) => {
  const retrivedData = await recipes.get({
    skip: +req.params.skip,
    limit: +req.params.limit,
  });
  res.statusCode = retrivedData.code;

  res.json(retrivedData.data);
});

app.get("/api/v1/recipes/:idx", async (req: Request, res: Response) => {
  const retrivedData = await recipes.get({ idx: req.params.idx });
  console.log(retrivedData);
  res.statusCode = retrivedData.code;

  res.json(retrivedData.data);
});

app.get(
  "/api/v1/recipes/user/:skip/:limit",
  clerk.expressWithAuth({}),
  async (req: RequestWithClerkAuth, res: Response) => {
    if (!req.auth?.sessionId) return unauthenticated(res);

    const retrivedData = await recipes.getByUser({
      userId: req.auth.userId,
      skip: +req.params.skip,
      limit: +req.params.limit,
    });

    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);
  }
);

app.post(
  "/api/v1/recipes",
  clerk.expressWithAuth({}),
  async (req: RequestWithClerkAuth, res: Response) => {
    console.log(req.auth);
    if (!req.auth?.sessionId) return unauthenticated(res);

    const user = await clerk.users.getUser(req.auth.userId as string);
    req.body.author = `${user.firstName} ${user.lastName}`;
    req.body.userId = user.id;

    const response = await recipes.add(req.body);

    res.statusCode = response.code;
    res.json(response);
  }
);

app.put(
  "/api/v1/recipes",
  clerk.expressWithAuth({}),
  async (req: RequestWithClerkAuth, res: Response) => {
    if (!req.auth?.sessionId) return unauthenticated(res);

    const user = await clerk.users.getUser(req.auth.userId);

    req.body.author = `${user.firstName} ${user.lastName}`;
    req.body.userId = user.id;

    console.log(req.body);

    const response = await recipes.update(req.body);

    res.statusCode = response.code;
    res.json(response);
  }
);

app.post(
  "/api/v1/recipes/images/upload",
  clerk.expressWithAuth({}),
  async (req: RequestWithClerkAuth, res: Response) => {
    if (!req.auth?.sessionId) return unauthenticated(res);

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.statusCode = 406;
        console.log(err);
        res.json({
          code: 406,
          msg: "UNEXPECTED FILE: Please ensure the file is an image file & less than 10MB.",
        });
        return;
      } else if (err) {
        console.log(err);
        res.statusCode = 500;
        res.json({
          code: 500,
          msg: "Internal Server Error, Please try again later.",
        });
        return;
      }

      const response = await recipes.addImage(req.file as Image);

      res.statusCode = response.code;
      res.json(response);
    });
  }
);

app.patch(
  "/api/v1/recipes/images/upload/:idx",
  clerk.expressWithAuth({}),
  async (req: RequestWithClerkAuth, res: Response) => {
    if (!req.auth?.sessionId) return unauthenticated(res);

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.statusCode = 406;
        res.json({
          code: 406,
          msg: "UNEXPECTED FILE: Please ensure the file is an image file & less than 10MB.",
        });
        return;
      } else if (err) {
        console.log(err);
        res.statusCode = 500;
        res.json({
          code: 500,
          msg: "Internal Server Error, Please try again later.",
        });
        return;
      }

      const response = await recipes.updateImage(
        req.file as Image,
        req.params.idx,
        req.auth?.userId as string
      );

      res.statusCode = response.code;
      res.json(response);
    });
  }
);

app.delete(
  "/api/v1/recipes/:idx",
  clerk.expressWithAuth({}),
  async (req: RequestWithClerkAuth, res: Response) => {
    if (!req.auth?.sessionId) return unauthenticated(res);

    const response = await recipes.delete(req.params.idx);
    res.statusCode = response.code;
    res.json(response);
  }
);

app.get("/api/v1/search/:skip/:limit", async (req: Request, res: Response) => {
  // const filters = req.query.diet ? { diet: req.query.diet } : {};

  const retrivedData = await search.query(
    req.query.q as string,
    // filters,
    +req.params.skip,
    +req.params.limit
  );

  console.log(req.query.q);

  res.statusCode = retrivedData.code;

  if (!retrivedData.data)
    return res.json({
      status: 404,
      message: retrivedData.msg,
    });

  res.json(retrivedData.data);
});

app.get("/api/v1/submissions/:id", async (req: Request, res: Response) => {
  // if (!req.auth.sessionId) return unauthenticated(res);

  const retrivedData = await submissions.status(req.params.id);
  res.statusCode = retrivedData.code;

  res.json(retrivedData.data);
});

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
