import 'source-map-support/register';

interface RetrieveJokeResult {
    id: string;
    text: string;
    timestamp: string;
}

interface RetrieveJokeRequest {
    ref: string;
}

export const retrieveJokeHandler = async (
    event: RetrieveJokeRequest,
): Promise<RetrieveJokeResult> => {
    var date = new Date();
    var text = 'Dummy joke'

    let result = {
        'id': event.ref,
        text,
        'timestamp': date.toISOString(),
    }

    console.info(`retrieve joke: ${JSON.stringify(result)}`);
    return result;
}
