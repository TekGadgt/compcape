exports.handler = async function (event, context) {
  const { Client } = require("@notionhq/client");

  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  if (event.queryStringParameters.cape === "comp") {
    var myPage = await notion.databases.query({
      database_id: process.env.NOTION_COMPCAPE,
      sorts: [{ property: "Name", direction: "ascending" }],
    });
  }

  if (event.queryStringParameters.cape === "mqc") {
    var myPage = [];

    var data = await notion.databases.query({
      database_id: process.env.NOTION_MQC,
      sorts: [{ property: "Name", direction: "ascending" }],
    });

    myPage = [...data];

    while (data.has_more) {
      data = await notion.databases.query({
        database_id: process.env.NOTION_MQC,
        sorts: [{ property: "Name", direction: "ascending" }],
        start_cursor: data.next_cursor,
      });

      myPage = [...myPage, ...data];
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  };
};
