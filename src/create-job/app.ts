import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as aws from "aws-sdk";
import * as crypto from "crypto";
// Create clients and set shared const values outside of the handler.
import CustomDynamoClient from "../utils/dynamodb";

export const createJobHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);

  const stateMachineArn = process.env.RETRIEVE_JOKE_STATE_MACHINE_ARN;

  const referenceNumber = crypto.randomBytes(16).toString("hex");
  const input = { ref: referenceNumber };

  const params = {
    stateMachineArn,
    input: JSON.stringify(input),
  };

  var stepfunctions = new aws.StepFunctions();
  await stepfunctions.startExecution(
    params,
    function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    }
  ).promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify({
      message: "hello world",
      ref: referenceNumber,
    }),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
