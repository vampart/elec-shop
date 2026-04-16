const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.USERS_TABLE;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

// POST /users/register — save new user to DynamoDB after Cognito signup
exports.register = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, name, cognitoSub } = body;

    if (!email || !name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Email and name are required' }),
      };
    }

    const user = {
      id: cognitoSub || `USR-${Date.now().toString(36).toUpperCase()}`,
      email,
      name,
      role: 'customer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      orderCount: 0,
      totalSpent: 0,
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)',
    }));

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: 'User created successfully', user }),
    };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ message: 'User already exists' }),
      };
    }
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to create user' }),
    };
  }
};

// GET /users/me — get current user profile
exports.getProfile = async (event) => {
  try {
    const cognitoSub = event.requestContext?.authorizer?.claims?.sub;
    if (!cognitoSub) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }

    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: cognitoSub },
    }));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to fetch user profile' }),
    };
  }
};

// PUT /users/me — update user profile
exports.updateProfile = async (event) => {
  try {
    const cognitoSub = event.requestContext?.authorizer?.claims?.sub;
    if (!cognitoSub) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }

    const body = JSON.parse(event.body);
    const { name, phone, address } = body;

    const result = await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: cognitoSub },
      UpdateExpression: 'SET #n = :name, phone = :phone, address = :address, updatedAt = :now',
      ExpressionAttributeNames: { '#n': 'name' },
      ExpressionAttributeValues: {
        ':name': name,
        ':phone': phone || '',
        ':address': address || '',
        ':now': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Profile updated', user: result.Attributes }),
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to update profile' }),
    };
  }
};
