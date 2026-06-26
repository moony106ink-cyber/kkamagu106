const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

exports.handler = async function(event, context) {
    const { dbId, pageId } = event.queryStringParameters;

    try {
        // 1. 상세 페이지 요청인 경우 (pageId가 있을 때)
        if (pageId) {
            const response = await notion.blocks.children.list({ block_id: pageId });
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response.results)
            };
        }

        // 2. 전체 목록 요청인 경우 (dbId가 있을 때)
        if (dbId) {
            const response = await notion.databases.query({ database_id: dbId });
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response.results)
            };
        }

        return { statusCode: 400, body: JSON.stringify({ error: "Missing parameters" }) };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};