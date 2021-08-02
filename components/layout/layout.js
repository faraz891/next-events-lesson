import React, { Fragment, useContext } from 'react'
import Header from "./header"
import Notification from "../ui/notification"
import { NotificationContext } from '../../context/notificationContext'


export default function Layout({ children }) {
    const { notification } = useContext(NotificationContext)
    return (
        <Fragment>
            <Header />
            <main>
                {children}
            </main>
            {notification && <Notification title={notification.title} message={notification.message} status={notification.status} />}
        </Fragment>
    )
}
