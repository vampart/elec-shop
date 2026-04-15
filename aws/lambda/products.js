const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.PRODUCTS_TABLE;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

// GET /products  or  GET /products?category=Audio
exports.getAll = async (event) => {
  try {
    const category = event.queryStringParameters?.category;

    let result;
    if (category) {
      result = await docClient.send(new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: 'CategoryIndex',
        KeyConditionExpression: 'category = :cat',
        ExpressionAttributeValues: { ':cat': category },
      }));
    } else {
      result = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to fetch products' }),
    };
  }
};

// GET /products/{id}
exports.getById = async (event) => {
  try {
    const { id } = event.pathParameters;

    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    }));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: 'Product not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to fetch product' }),
    };
  }
};
