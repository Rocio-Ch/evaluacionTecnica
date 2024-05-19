import axios from "axios";
import { ref } from "vue";
import { format } from 'date-fns'

export const useTasks = () => {
    const tasks = ref()
    const task = ref()

    const dbFormattedDate = (tasks) => {
        return tasks.map(task => {
            const formattedDate = format(new Date(task.expires_at), 'dd-MM-yy')
            return {
                ...task,
                expires_at: formattedDate
            }
        })
    }

    const getTasks = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/task")
            tasks.value = dbFormattedDate(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/task/${id}`)
            task.value = data
        } catch (error) {
            
        }
    }

    const postTask = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/task", editedData
          )
        return data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTask = async (id) => {
        try {
          const { data } = await axios.delete(`http://localhost:3001/task/${id}`)
          return data
        } catch (error) {
          console.error(error)
        }
    }

    const removeTask = (id) => {
        tasks.value = tasks.value.filter((task) => task.id !== id)
    }

    return {
        tasks,
        getTasks,
        getTask,
        postTask,
        deleteTask,
        removeTask
    }
}
