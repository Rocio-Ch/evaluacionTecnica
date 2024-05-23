import { format } from 'date-fns'

export const useFormatDate = () => {

    //As I won't be using this function with another property or date format in another component, I'm passing one parameter. In another situation, knowing that my application may grow, I would do it with more parameters so that it can be used in any case
    const frontFormattedDates = (arr) => {
        return arr.map(item => {
            const formattedDate = format(new Date(item.expires_at), 'MM-dd-yy')
            return {
                ...item,
                expires_at: formattedDate
            };
        })
    }

    const formatDate = (item, dateProp, formatD) => {
        const formattedDate = format(new Date(item[dateProp]), formatD);
        return {
            ...item,
            [dateProp]: formattedDate
        };
    }

    return {
        frontFormattedDates,
        formatDate
    }
}
