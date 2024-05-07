import PubSub from 'pubsub-js'
import {events} from "../yam/lib/constants";

const blockChainOpWrapper = async (operation: Promise<any>, operationName: string ): Promise<boolean> => {
    let success = true;

    try {
        PubSub.publish(events.transaction.Started,operationName);
        const txInfo = await operation;
        PubSub.publish(events.transaction.Success, [operationName,txInfo]);

    } catch (e) {
        success = false;
        PubSub.publish(events.transaction.Failed, [operationName,e.message]);
    }

    return success;
}

export default blockChainOpWrapper