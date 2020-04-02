import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

const createNotification = () => ({
  title: "Do your quizes",
  body: "Don't forget to do your quizes today",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    vibrate: true,
    sticky: false,
    prioroty: "hight"
  }
});

export const setLocalNotification = async () => {
  const notification = JSON.parse(await AsyncStorage.getItem("notification"));
  if (!notification) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === "granted") {
      Notifications.cancelAllScheduledNotificationsAsync();
      let tommorow = new Date();
      tommorow.setDate(tommorow.getDate());
      tommorow.setHours(5);
      tommorow.setMinutes(50);
      Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: tommorow,
        repeat: "minute"
      });
      AsyncStorage.setItem("notification", JSON.stringify(true));
    }
  }
};

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem("notification");
  Notifications.cancelAllScheduledNotificationsAsync();
};
