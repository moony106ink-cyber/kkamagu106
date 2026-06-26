const { Client } = require('@notionhq/client');

exports.handler = async function(event, context) {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const databaseId = event.queryStringParameters.dbId;

    try {
        const response = await notion.databases.query({ database_id: databaseId });
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response.results)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};