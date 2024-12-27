import { Express } from "express";
import authRouter from "./routes/user.route";

import productRouter from "./routes/product.route";

function Routes(app: Express) {
  app.use("/api/auth", authRouter);
  app.use("/api/product", productRouter);
}
export default Routes;
