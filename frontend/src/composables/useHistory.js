import axios from "axios";
import { ref } from "vue";
import { useFormatDate } from "../composables/useFormatDate"


export const useHistory = () => {

    const { formatDate } = useFormatDate()
    const history = ref()
    const idTask = ref(null)

    const getHistory = async (taskId) => {
        try {
          const { data } = await axios.get(`http://localhost:3001/history/${taskId}`)
          history.value = historyFormattedDates(data)
        } catch (error) {
          console.log(error)
        }
      }

      const historyFormattedDates = (history) => {
          return history.map(element => {
            const formattedDate = formatDate(element.update_status_at, 'dd-MM-yy')
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
        idTask,
    }
}
