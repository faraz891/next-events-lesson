export async function getAllEvents() {
    const response = await fetch('https://nextjs-78e8b-default-rtdb.firebaseio.com/events.json')
    const data = await response.json()

    let events = []

    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        });
    }

    return events
}

export async function getFeaturedEvents() {
    const featuredEvents = await getAllEvents()
    return featuredEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const events = await getAllEvents()
    return events.find((event) => event.id === id);
}


export async function getFilteredEvents(dateFilter) {
    const events = await getAllEvents()

    const { year, month } = dateFilter;

    let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}