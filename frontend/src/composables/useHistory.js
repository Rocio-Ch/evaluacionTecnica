import axios from "axios";
import { ref } from "vue";
import { useFormatDate } from "../composables/useFormatDate"


export const useHistory = () => {

    const { formatDate } = useFormatDate()
    const history = ref()
    const idHistory = ref(null)

    const getHistory = async (historyId) => {
        try {
          const { data } = await axios.get(`http://localhost:3001/history/${historyId}`)
          history.value = historyFormattedDates(data)
        } catch (error) {
          console.log(error)
        }
      }

      const historyFormattedDates = (history) => {
        return history.map(element => {
            const formattedDate = formatDate(element, 'update_status_at', 'dd-MM-yy');
            const comment = element.comment || "no comments";
            return {
                ...formattedDate,
                comment: comment
            };
        });
    }

    return {
        getHistory,
        history,
        idHistory,
    }
}
