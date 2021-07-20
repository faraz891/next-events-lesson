import React from 'react'
import EventListItem from './event-item'
import styles from "./event-list.module.css"



export default function EventList(props) {
    const { events } = props
    return (
        <ul className={styles.list}>
            {events.map(event => (
                <EventListItem key={event.id} event={event} />
            ))}
        </ul>
    )
}
