import React, { useState, createContext, useEffect } from "react";

export const NotificationContext = createContext();



const NotificationContextProvider = (props) => {

    const [notification, setNotifications] = useState();

    const showNotification = (notificationData) => {
        setNotifications(notificationData)
    }

    const hideNotification = () => {
        setNotifications(null)
    }

    useEffect(() => {

        if (notification && (notification.status === 'success' || notification.status === 'error')) {
            const timer = setTimeout(() => {
                setNotifications(null)
            }, 3000)

            return () => {
                clearTimeout(timer)
            }
        }

    }, [notification])

    return (
        <NotificationContext.Provider
            value={{
                notification,
                showNotification,
                hideNotification
            }}
        >
            {props.children}
        </NotificationContext.Provider >
    );
};

export default NotificationContextProvider