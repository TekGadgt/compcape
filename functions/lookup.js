exports.handler = async function (event, context) {
    const { Client } = require("@notionhq/client")

    const notion = new Client({
        auth: process.env.NOTION_SECRET,
    })

    const myPage = await notion.databases.query({
        database_id: process.env.NOTION_DB,
        sorts: [{ property: "Name", direction: "ascending" }],
    })

    return {
        statusCode: 200,
        body: JSON.stringify(myPage),
    }
}
