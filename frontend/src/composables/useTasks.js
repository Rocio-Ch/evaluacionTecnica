import axios from "axios";
import { ref } from "vue";
import { format } from 'date-fns'

export const useTasks = () => {
    const tasks = ref()

    const getTasks = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/task")
            tasks.value = dbFormattedDate(data)
            console.log(tasks.value)
        } catch (error) {
            console.log(error)
        }
    }

    function dbFormattedDate(tasks) {
        return tasks.map(task => {
            const fotmattedDate = format(new Date(task.expires_at), 'dd-MM-yy')
            task.expires_at = fotmattedDate
            return task
        })
    }



    return {
    tasks,
    getTasks,
    }
}
