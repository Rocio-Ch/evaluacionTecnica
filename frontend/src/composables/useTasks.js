import axios from "axios";
import { ref } from "vue";
import { useFormatDate } from "../composables/useFormatDate"
import { toDate } from "date-fns";

export const useTasks = () => {

    const { frontFormattedDates, formatDate } = useFormatDate()
    const idTask = ref()
    const tasks = ref()
    const deletedTasks = ref()
    const resetTask = {
        title: '',
        description: '',
        status_id: 2,
        expires_at: new Date(),
      }
    const task = ref({...resetTask})

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
            data.expires_at = toDate(data.expires_at)
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
          return formatDate(data, 'expires_at', 'MM-dd-yy')
        } catch (error) {
            console.error(error)
        }
    }

    const updateData = async () => {
        try {
            const editedTask = {...task.value}
            const { data } = await axios.put(
              `http://localhost:3001/task/${editedTask.id}`,
            editedTask
          )
          return data
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

    const modifyTask = (editedTask) => {
        tasks.value = tasks.value.map((task) => {
          if (task.id === editedTask.id) {
            return formatDate(editedTask, 'expires_at', 'MM-dd-yy')
          }
          return task
        })
        idTask.value = null
    }

    /* RECYCLE BIN */
    const getDeletedTasks = async () => {
      try {
          const { data } = await axios.get("http://localhost:3001/task/deleted")
          deletedTasks.value = frontFormattedDates(data)
      } catch (error) {
          console.log(error)
      }
    }

    const getDeletedTask = async (id) => {
      try {
          const { data } = await axios.get(`http://localhost:3001/task/deleted/${id}`)
          data.expires_at = toDate(data.expires_at)
          task.value = data
      } catch (error) {
          console.log(error)
        }
    }

    const modifyDeletedTask = (editedTask) => {
      deletedTasks.value = deletedTasks.value.map((task) => {
        if (task.id === editedTask.id) {
          return formatDate(editedTask, 'expires_at', 'MM-dd-yy')
        }
        return task
      })
      task.value = {...resetTask}
    }
    
    const removeDeletedTask = (id) => {
      deletedTasks.value = deletedTasks.value.filter((task) => task.id !== id)
    }

    const updateDeletedData = async () => {
      try {
          const editedTask = {...task.value}
          const { data } = await axios.put(
            `http://localhost:3001/task/deleted/${editedTask.id}`,
          editedTask
        )
        return data
      } catch (error) {
        console.error(error)
      }
    }

    return {
        tasks,
        idTask,
        getTasks,
        task,
        getTask,
        postData,
        deleteData,
        removeTask,
        addTask,
        modifyTask,
        updateData,
        resetTask,
        deletedTasks,
        getDeletedTasks,
        getDeletedTask,
        modifyDeletedTask,
        removeDeletedTask,
        updateDeletedData
    }
}
