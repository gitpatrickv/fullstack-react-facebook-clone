import Stomp from "stompjs";
import { create } from "zustand";
import { NotificationModel } from "../entities/Notification";

interface NotificationStore {
  stompClientRef: React.MutableRefObject<Stomp.Client | null>;
  notificationModels: NotificationModel[];
  setNotificationModels: (notification: NotificationModel[]) => void;
  addNotification: (notification: NotificationModel) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => {
  const stompClientRef: React.MutableRefObject<Stomp.Client | null> = {
    current: null,
  };

  return {
    stompClientRef,
    notificationModels: [],
    setNotificationModels: (notifications) =>
      set({ notificationModels: notifications }),
    addNotification: (notification) =>
      set((state) => ({
        notificationModels: [...state.notificationModels, notification],
      })),
  };
});
