import db from "../connection/index.js"

export default {

    getTasks: async (req, res) => {
        try {
            const { recordset } = await db.query`
            SELECT t.*, s.name AS status_name
            FROM task t
            JOIN status s ON t.status_id = s.id
            WHERE t.is_active = 1;
            `;
            res.send(recordset);
        } catch (error) {
            console.log(error)
        }
    },
    
    createTask: async (req, res) => {
        try {
            const { title, description, status_id, expires_at } = req.body;
            const { recordset } = await db.query(`
                DECLARE @NewTask TABLE (id INT);

                INSERT INTO task (title, description, status_id, expires_at)
                OUTPUT inserted.id INTO @NewTask
                VALUES ('${title}', '${description}', ${status_id}, '${expires_at}');
                
                SELECT t.*, s.name AS status_name
                FROM task t
                JOIN status s ON t.status_id = s.id
                WHERE t.id = (SELECT id FROM @NewTask);
            `);
            res.status(201).json(recordset[0]);
        } catch (error) {
            console.error('Create task error:', error);
            res.status(500).send('Create task error');
        }
    },

    getTask: async (req, res) => {
        try {
            const taskId = Number(req.params.id);
            const { recordset } = await db.query`
                SELECT t.*, s.name AS status_name
                FROM task t
                JOIN status s ON t.status_id = s.id
                WHERE t.id = ${taskId} AND t.is_active = 1;
            `;
            if (recordset.length > 0) {
                res.send(recordset[0]);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            console.error('Error requesting task:', error);
            res.status(500).send('Error requesting task');
        }
    },

    updateTask: async (req, res) => {
        try {
            const taskId = Number(req.params.id)
            const { title, description, status_id, expires_at } = req.body;
    
            const { recordset } = await db.query(`
                DECLARE @UpdatedTask TABLE (id INT);
    
                UPDATE task
                SET title = '${title}', description = '${description}', status_id = ${status_id}, expires_at = '${expires_at}'
                OUTPUT inserted.id INTO @UpdatedTask
                WHERE id = ${taskId};
    
                SELECT t.*, s.name AS status_name
                FROM task t
                JOIN status s ON t.status_id = s.id
                WHERE t.id = (SELECT id FROM @UpdatedTask);
            `);
    
            if (recordset.length === 0) {
                return res.status(404).send('Task not found');
            }
    
            res.status(200).json(recordset[0]);
        } catch (error) {
            console.error('Update task error:', error);
            res.status(500).send('Update task error');
        }
    },

    //Here I decided to apply logical deletion to avoid losing information and to be able to recover it in the future if necessary. It doesn't delete the data; it just changes the value of the is_active status in the database. The information remains stored without the user being able to access it
    deleteTask: async (req, res) => {
        try {
            const taskId = Number(req.params.id)
            const { recordset } = await db.query`UPDATE task SET is_active = 0 WHERE id = ${taskId}`
            res.send(recordset)
        } catch (error) {
            console.log(error)
        }
    },
}