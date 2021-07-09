import { constructAPIGwEvent } from "../../utils/helpers";

// Import all functions from put-item.js 
import { createJobHandler } from '../../../src/create-job/app'; 

// This includes all tests for createJobHandler() 
describe('Test createJobHandler', function () { 
    it('should respond with Hello World', async () => {
        const event = constructAPIGwEvent(
            { },
            { method: 'POST' },
        );
     
        // Invoke createJobHandler() 
        const result = await createJobHandler(event); 
 
        // Compare the result with the expected result 
        expect(result.statusCode).toEqual(201);
        expect(JSON.parse(result.body)).toMatchObject({ message: "hello world" });
    }); 
}); 
 