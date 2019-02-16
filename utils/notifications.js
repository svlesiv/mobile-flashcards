import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'mobile-flashcards:notifications';

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)  // remove notification
    .then(Notifications.cancelAllScheduledNotificationsAsync) // delete all future notifications
}
  
function createNotification () {
  return {
    title: 'Take a quiz',
    body: "👋 don't forget to take a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY) // if notifications has been set
    .then(JSON.parse)
    .then((data) => {       // we will grab data
      if (data === null) {  // we haven't set up local notificatins
        Permissions.askAsync(Permissions.NOTIFICATIONS) // ask for permissions
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync() // cancel all future reminders...
                                                                    
              // create an object that represents a date
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(19)
              tomorrow.setMinutes(18)

              // create notification
              Notifications.scheduleLocalNotificationAsync(
                createNotification(), // call our function
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              // save notification in local storage
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true)) 
            }
          })
    }
  })
}
  