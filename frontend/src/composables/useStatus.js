import axios from "axios";
import { ref } from "vue";

export const useStatus = () => {

  const statusNames = ref([])
  const status = ref()

    const getAllStatus = async () => {
        try {
          const { data } = await axios.get('http://localhost:3001/status')
          statusNames.value = data.map(status => status.name)
          status.value = data
        } catch (error) {
          console.log(error)
        }
      }

/*     const getStatus = async (statusId) => {
        try {
            const { data } = await axios.get(`https://localhost:3001/status/${statusId}`)
            return data
        } catch (error) {
            console.log(error);
        }
    } */

    return {
      statusNames,
      status,
      getAllStatus,
    }
}
