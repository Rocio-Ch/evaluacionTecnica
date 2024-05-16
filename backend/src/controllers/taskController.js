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
            
        } catch (error) {
            
        }
    },

    updateTask: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

    deleteTask: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },
   
}