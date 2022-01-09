exports.handler = async function (event, context) {
    const { Client } = require("@notionhq/client")

    const notion = new Client({
        auth: process.env.NOTION_SECRET,
    })

    if(event.queryStringParameters.username === 'tekgadgt') {
        var myPage = await notion.databases.query({
            database_id: process.env.NOTION_TEKGADGT,
            sorts: [{ property: "Name", direction: "ascending" }],
        })
    } else if (event.queryStringParameters.username === 'jsleek21') {
        var myPage = await notion.databases.query({
            database_id: process.env.NOTION_JSLEEK21,
            sorts: [{ property: "Name", direction: "ascending" }],
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(myPage),
    }
}