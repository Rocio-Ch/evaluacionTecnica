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

    getStatus: async (req, res) => {
        try {
            const statusId = Number(req.params.id)
            const { recordset } = await db.query`SELECT * FROM status WHERE id = ${statusId}`;
            if (recordset) {
                res.send(recordset);
            } else 
                res.staus(404).json({message: 'Status not found'})     
        } catch (error) {
            console.log(error)
        }
    },
}