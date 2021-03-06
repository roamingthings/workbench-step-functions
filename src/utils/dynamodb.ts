// Create a DocumentClient that represents the query to add an item
import DynamoDB from 'aws-sdk/clients/dynamodb';

// Declare some custom client just to illustrate how TS will include only used files into lambda distribution
export default class CustomDynamoClient {
    table: string;
    docClient: DynamoDB.DocumentClient;

    constructor(table = process.env.JOB_TABLE) {
        this.docClient = new DynamoDB.DocumentClient();
        this.table = table;
    }

    async readAll() {
        const data = await this.docClient.scan({ TableName: this.table }).promise();
        return data.Items;
    }

    async read(id: any) {
        var params = {
            TableName : this.table,
            Key: { Id: id },
        };
        const data = await this.docClient.get(params).promise();
        return data.Item;
    }

    async write(Item: object) {
        const params = {
            TableName: this.table,
            Item,
        };

        return await this.docClient.put(params).promise();
    }
}
