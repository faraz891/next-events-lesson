import { getDatabaseConnection, insertDatabaseData, getCommentsByEvent } from '../../../helpers/db-util'



async function handler(req, res) {
    let client;

    try {
        client = await getDatabaseConnection()
    } catch (err) {
        res.status(500).json({ err: err })
        return
    }


    if (req.method === 'POST') {
        const { email, name, text } = req.body
        const eventId = req.query.eventId

        if (!email.includes('@') || !name || name.trim() === "" || !text || text.trim() === "") {
            res.status(422).json({ message: "Please enter valid fileds" })
            return
        }
        const newComment = {
            email,
            name,
            text,
            eventId
        }

        try {
            const result = await insertDatabaseData(client, 'comments', newComment)
            res.status(200).json({ message: `Comment sent successfully at ${eventId}`, data: result })
        } catch (err) {
            res.status(500).json({ err: err.message })
            return
        }

    }

    //get comments
    if (req.method === 'GET') {
        const eventId = req.query.eventId

        try {
            const eventComments = await getCommentsByEvent(client, 'comments', eventId)
            res.status(200).json({ comments: eventComments })
        } catch (error) {
            res.status(500).json({ err: err })
            return
        }

    }


    client.close();
}

export default handler