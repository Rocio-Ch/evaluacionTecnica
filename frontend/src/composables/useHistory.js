import axios from "axios";
import { ref } from "vue";
import { format } from 'date-fns'

export const useHistory = () => {

    const history = ref()
    const idTask = ref(null)

    const getHistory = async (taskId) => {
        try {
          const { data } = await axios.get(`http://localhost:3001/history/${taskId}`)
          history.value = dbFormattedDate(data)
        } catch (error) {
          console.log(error)
        }
      }

      const dbFormattedDate = (history) => {
          return history.map(element => {
            const formattedDate = format(new Date(element.update_status_at), 'dd-MM-yy')
            const comment = element.comment || "no comments";
            return {
                ...element,
                update_status_at: formattedDate,
                comment: comment
            };
        })
    }

    return {
        getHistory,
        history,
        idTask
    }
}
