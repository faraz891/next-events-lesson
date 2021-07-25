function handler(req, res) {

    if (req.method === 'POST') {
        const { email, name, text } = req.body
        const eventId = req.query.eventId

        if (!email.includes('@') || !name || name.trim() === "" || !text || text.trim() === "") {
            res.status(422).json({ message: "Please enter valid fileds" })
            return
        }
        res.status(200).json({ message: `Comment sent successfully at ${eventId}` })
    }

    if (req.method === 'GET') {
        const dummyComments = [
            { id: 1, text: "I love mine", name: "Rechie" },
            { id: 2, text: "mine is cute boy", name: "Ruth" },
        ]
        res.status(200).json({ comments: dummyComments })
    }

}

export default handler