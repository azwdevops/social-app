import app from "./app";
import "module-alias/register";

app.listen(5000, () => {
  console.log("listening on port 5000");
});
