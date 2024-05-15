import sql from "../connection/index"

export default {

    getTasks: async (req, res) => {
        try {
            const tasks = await sql.query`select * from task`;
            res.send(tasks);
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