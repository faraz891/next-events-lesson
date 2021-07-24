import { Fragment, useState, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Head from 'next/head'
import EventList from '../../components/events/event-list'
import EventTile from "../../components/events/results-title"
import ErrorAlert from "../../components/ui/error-alert"
import Button from "../../components/ui/button"



export default function FilteredEventPage() {
    const router = useRouter()
    const [loadedEvents, setLoadEvents] = useState([])
    const filteredData = router.query.slug

    const { data, error } = useSWR('https://nextjs-78e8b-default-rtdb.firebaseio.com/events.json')

    useEffect(() => {
        if (data) {
            let events = []

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }
            setLoadEvents(events)
        }
    }, [data])


    const year = filteredData[0]
    const month = filteredData[1]

    const numYear = +year
    const numMonth = +month

    const pageHead = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`Filtered events for ${numMonth}/${numYear}`} />
        </Head>
    )

    if (!filteredData) {
        return (
            <Fragment>
                {pageHead}
                <p className="center">Loading</p>
            </Fragment>
        )
    }




    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                {pageHead}
                <ErrorAlert >
                    <p>Invalid Filter of Events</p>
                </ErrorAlert >
                <div className="center">
                    <Button link="/events">Show all events</Button>
                </div>
            </Fragment>
        )
    }

    let filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHead}
                <ErrorAlert>
                    <p>No Events found</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show all events</Button>
                </div>
            </Fragment>
        )
    }


    const date = new Date(numYear, numMonth - 1)


    return (
        <Fragment>
            {pageHead}
            <EventTile date={date} />
            <EventList events={filteredEvents} />
        </Fragment>
    )
}


