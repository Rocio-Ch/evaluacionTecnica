import db from "../connection/index.js"

export default {

    getHistory: async (req, res) => {
        try {
            const taskId = Number(req.params.id)
            const { recordset } = await db.query`
            SELECT h.*, 
            s.name as status_name
            FROM history h
            JOIN status s ON h.status_id = s.id
            WHERE h.task_id = ${taskId};    
            `;
            res.send(recordset);
        } catch (error) {
            console.log(error)
        }
    },
}