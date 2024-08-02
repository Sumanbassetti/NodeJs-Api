import { IRouter, Router } from "express";
import userRouter from "./user.router";
import categoryRouter from "./category.router";
import questionRouter from "./question.router";
const appRouter: IRouter = Router();

// User Router.
appRouter.use("/user", userRouter);
//Category Router
appRouter.use("/category", categoryRouter);
//Question Router
appRouter.use("/question", questionRouter);
//Default route
appRouter.route("/").get((req, res) => {
  res.send("API is running");
});

export default appRouter;
