import db from "../connection/index.js"

export default {

    getAllStatus: async (req, res) => {
        try {
            const { recordset } = await db.query`
                SELECT * FROM status;
            `;
            res.send(recordset);
        } catch (error) {
            console.log(error)
        }
    },
}