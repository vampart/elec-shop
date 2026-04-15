const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const crypto = require('crypto');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ORDERS_TABLE;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

// POST /orders
exports.create = async (event) => {
  try {
    const userId = event.requestContext.authorizer?.claims?.sub;
    const body = JSON.parse(event.body);

    const order = {
      id: `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      userId,
      items: body.items,
      shippingAddress: body.shippingAddress,
      total: body.total,
      status: 'Processing',
      paymentIntentId: body.paymentIntentId,
      createdAt: new Date().toISOString(),
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: order,
    }));

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(order),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to create order' }),
    };
  }
};

// GET /orders
exports.getByUser = async (event) => {
  try {
    const userId = event.requestContext.authorizer?.claims?.sub;

    const result = await docClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: { ':uid': userId },
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to fetch orders' }),
    };
  }
};
