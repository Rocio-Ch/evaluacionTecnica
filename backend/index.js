//In the package.json, I installed nodemon not as a project dependency, but as a development dependency: it helps automatically refresh the application when it detects a change

//Dotenv is a dependency that loads environment variables
import dotenv from "dotenv";
import app from "./src/app.js"

dotenv.config();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}, Evaluacion Tecnica TANDEM`);
});
