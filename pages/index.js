import React, { Fragment } from 'react'
import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

export default function HomePage(props) {

    return (
        <Fragment>
            <EventList events={props.events} />
        </Fragment>
    )
}

export async function getStaticProps() {

    const featuredEvents = await getFeaturedEvents()

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800,
    };
}