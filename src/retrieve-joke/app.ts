import 'source-map-support/register';
import axios, { AxiosResponse } from 'axios';

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

    const res = await axios.get('https://v2.jokeapi.dev/joke/Programming?type=single');

    const joke = res.data.joke;
    console.log(joke);

    let result = {
        'id': event.ref,
        'text': joke,
        'timestamp': date.toISOString(),
    }

    console.info(`retrieve joke: ${JSON.stringify(result)}`);
    return result;
}
