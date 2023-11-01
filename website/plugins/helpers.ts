import dayjs from 'dayjs'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (dateTime: string): string => {
        return dayjs(dateTime).format('D MMM YYYY')
      }
    }
  }
})
