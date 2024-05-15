
import sql from "mssql"

const sqlConfig = {
        database: process.env.DATABASE_URL,
        server: 'localhost',
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
         /*  encrypt: true, // for azure */
          trustServerCertificate: true // change to true for local dev / self-signed certs
        }
}

//Aca inicia la instancia y lo conecta con la base de datos
await sql.connect(sqlConfig)

export default sql