import axios from "axios";
import { ref } from "vue";
import { useFormatDate } from "../composables/useFormatDate"


export const useTasks = () => {

    const { frontFormattedDates, formatDate } = useFormatDate()
    const tasks = ref()
    const task = ref()

    const getTasks = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/task")
            tasks.value = frontFormattedDates(data)
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

    const postData = async () => {
        try {
            const editedTask = {...task.value}
            const { data } = await axios.post(
                "http://localhost:3001/task", editedTask
          )
        return formatDate(data, 'dd-MM-yy')
        } catch (error) {
            console.error(error)
        }
    }

    const deleteData = async (id) => {
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

    const addTask = (task) => {
        tasks.value.push(task)
    }

    return {
        tasks,
        getTasks,
        task,
        getTask,
        postData,
        deleteData,
        removeTask,
        addTask
    }
}
