import { getDatabaseConnection, insertDatabaseData } from "../../../helpers/db-util"


async function handler(req, res) {
    let client;

    try {
        client = await getDatabaseConnection()
    } catch (error) {
        res.status(500).json({ message: "Database connection fail" })
        return
    }


    if (req.method === 'POST') {
        const email = req.body.email



        try {
            if (!email || !email.includes('@')) {
                res.status(422).json({ message: "Please enter valid email" })
                return
            }
            const result = await insertDatabaseData(client, 'newsletter', { email })
            res.status(200).json({ message: "Email send successfully" })
        } catch (error) {
            res.status(500).json({ message: "Error in sending data" })
            return
        }

        client.close();
    }
}

export default handler