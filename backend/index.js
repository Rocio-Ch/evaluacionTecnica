//En el package.json instale nodemon no como una dependencia del proyecto, si no como una dependencia de desarrollo: el cual ayuda a refrescar automaticamente la aplicacion cuando detecta un cambio

//Dotenv es una dependencia que carga varibles de entorno
import dotenv from "dotenv";
import server from "./src/app.js";

dotenv.config();
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}, Evaluacion Tecnica TANDEM`);
});
