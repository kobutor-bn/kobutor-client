import React, {createContext, ReactNode, useContext, useState} from "react";

interface Notification {
    id: number;
    message: string;
    type: "success" | "error" | "info";
}

interface NotificationContextProps {
    addNotification: (message: string, type: "success" | "error" | "info") => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

let notificationId = 0;

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (message: string, type: "success" | "error" | "info") => {
        const id = notificationId++;
        setNotifications((prev) => [...prev, {id, message, type}]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        }, 1500);
    };

    return (
        <NotificationContext.Provider value={{addNotification}}>
            {children}
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded shadow-md text-white ${
                            notification.type === "success" ? "bg-green-500" :
                                notification.type === "error" ? "bg-red-500" : "bg-blue-500"
                        }`}
                    >
                        {notification.message}
                    </div>
                ))}
            </div>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};