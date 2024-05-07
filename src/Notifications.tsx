import PubSub from 'pubsub-js'
import {events} from "./yam/lib/constants";
import { useToasts } from 'react-toast-notifications'
import React,{useEffect} from "react";
import {ScalingSquaresSpinner} from 'react-epic-spinners'
import styled from "styled-components";


const Notifications : React.FC = () => {
    const {addToast, removeToast} = useToasts();
    const toasts: { [optype: string]:string[] } = {};

    function addNotification(optype:string, id:string) {
        if (toasts[optype]){
            toasts[optype].push(id);
        } else {
            toasts[optype]=[id];
        }

    }

    function removeNotification(optype:string) {
        if (toasts[optype]) {
            let id = toasts[optype].shift();
            if (id){
                removeToast(id);
            }
        }
    }

    useEffect(() => {

        PubSub.subscribe(events.transaction.Started, (message:string, operation:string) => addToast(<InProgressNotification operation={operation}/> , { appearance: 'info' }, (id:string) => addNotification(operation, id)));
        PubSub.subscribe(events.transaction.Success, (message:string, data:any[]) => {
            addToast(<div> <p>{data[0]} Successful</p> <a href={"https:\\\\etherscan.io\\tx\\"+data[1].transactionHash} target="_blank" >View on EtherScan</a>  </div>, { appearance: 'success', autoDismiss: true });
            removeNotification(data[0]);
        });
        PubSub.subscribe(events.transaction.Failed, (message:string, data:string[]) => {
            addToast(<div> <p>{data[0]} Failed</p> <a>{data[1]}</a>  </div>, { appearance: 'error', autoDismiss: true });
            removeNotification(data[0]);
        });

        return () => {
            PubSub.unsubscribe(events.transaction.Started)
            PubSub.unsubscribe(events.transaction.Success)
            PubSub.unsubscribe(events.transaction.Failed)
        }
    }, [])
    return <></>
}

interface ProgressNotificationProps {
    operation: string;
}

const InProgressNotification: React.FC<ProgressNotificationProps> = ({ operation }) => (
    <Centered>
        <Indlined>{operation} in progress </Indlined>
        {/*<Indlined><ScalingSquaresSpinner size={20} color='#3399ff' /></Indlined>*/}
    </Centered>
)

const Centered =styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
`

const Indlined = styled.div`
  display: inline-flex;
  text-align: left;
  vertical-align:middle;
  margin: 35;
`

export default Notifications