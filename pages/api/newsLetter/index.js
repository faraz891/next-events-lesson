function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: "Please enter valid email" })
            return
        }

        console.log(email)
        res.status(200).json({ message: "Email send successfully" })

    }
}

export default handler