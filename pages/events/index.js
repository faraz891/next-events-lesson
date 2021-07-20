import { Fragment } from 'react'
import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import EventSearch from "../../components/events/event-search"
import { getAllEvents } from '../../helpers/api-util'


export default function AllEventsPage(props) {
    const router = useRouter()
    const events = props.events

    const onSearchEvents = (selectedYear, selectedMonth) => {
        const path = `/events/${selectedYear}/${selectedMonth}`
        router.push(path)
    }


    return (
        <Fragment>
            <EventSearch onSearchEvents={onSearchEvents} />
            <EventList events={events} />
        </Fragment>
    )
}

export async function getStaticProps() {

    const allEvents = await getAllEvents()

    return {
        props: {
            events: allEvents
        },
        revalidate: 60,
    };
}


