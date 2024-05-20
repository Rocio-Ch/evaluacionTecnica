import { format } from 'date-fns'

export const useFormatDate = () => {

    //As I won't be using this function with another property or date format in another component, I'm passing one parameter. In another situation, knowing that my application may grow, I would do it with more parameters so that it can be used in any case
    const frontFormattedDates = (arr) => {
        return arr.map(item => {
            const formattedDate = format(new Date(item.expires_at), 'dd-MM-yy')
            return {
                ...item,
                expires_at: formattedDate
            };
        })
    }

    //I use two parameters here because I need it both to format the date from the input date when sending it to the back-end and from the back-end when displaying it in the table when adding a single task
    const formatDate = (item, formatD) => {
        const formattedDate = format(new Date(item.expires_at), formatD)
        return {
            ...item,
            expires_at: formattedDate
        };
    }

    return {
        frontFormattedDates,
        formatDate
    }
}
