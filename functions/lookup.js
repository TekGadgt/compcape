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
    var tempData = [];

    var data = await notion.databases.query({
      database_id: process.env.NOTION_MQC,
      sorts: [{ property: "Name", direction: "ascending" }],
    });

    tempData = [...data.results];

    while (data.has_more) {
      data = await notion.databases.query({
        database_id: process.env.NOTION_MQC,
        sorts: [{ property: "Name", direction: "ascending" }],
        start_cursor: data.next_cursor,
      });

      tempData = [...tempData, ...data.results];
    }

    var myPage = tempData.map((achievement) => ({
      title: achievement.properties["Name"].title[0].plain_text,
      url: achievement.properties["URL"].url,
      type: achievement.properties["Type"].select.name,
      done: achievement.properties["Done?"].checkbox,
      close: achievement.properties["Close?"].checkbox,
    }));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  };
};
