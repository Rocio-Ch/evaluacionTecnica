import db from "../connection/index.js"

export default {

    getTasks: async (req, res) => {
        try {
            const { recordset } = await db.query`SELECT * FROM task`;
            res.send(recordset);
        } catch (error) {
            console.log(error)
        }
    },

    createTask: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

    getTask: async (req, res) => {
        try {
            const taskId = Number(req.params.id)
            const { recordset } = await db.query`SELECT * FROM task WHERE id = ${taskId}`;
            if (recordset) {
                res.send(recordset);
            } else 
                res.staus(404).json({message: 'Task not found'})     
        } catch (error) {
            console.log(error)
        }
    },

    updateTask: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    },

    deleteTask: async (req, res) => {
        try {
            const taskId = Number(req.params.id)
            const { recordset } = await db.query`DELETE FROM task WHERE id = ${taskId}`
            res.send(recordset)

        } catch (error) {
            console.log(error)
        }
    },
   
}