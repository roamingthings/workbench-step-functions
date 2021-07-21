import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as aws from "aws-sdk";
import CustomDynamoClient from "../utils/dynamodb";

export const jobStatusHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `postMethod only accepts GET method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);
  console.info("queryStringParameters:", event.queryStringParameters);
  console.info("pathParameters:", event.pathParameters);

  const dynamoClient = new CustomDynamoClient();
  const jobId = event.pathParameters.proxy;
  if (jobId == null) {
    const response = {
      statusCode: 404,
    } as APIGatewayProxyResult;
  
    return response;
  
  }
  const jobStatus = await dynamoClient.read(jobId)
  if (jobStatus == null) {
    const response = {
      statusCode: 404,
    } as APIGatewayProxyResult;
  
    return response;
  
  }

  console.info(
    `jobStatus: ${jobStatus}`
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      id: jobStatus.Id,
      status: jobStatus.Status,
      text: jobStatus.Text,
    }),
  } as APIGatewayProxyResult;

  return response;
};
