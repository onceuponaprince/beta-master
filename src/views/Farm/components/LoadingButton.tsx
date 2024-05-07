import React, { useState, useEffect } from 'react';
import Button from "../../../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useModal from "../../../hooks/useModal";
import ConfirmModal from "../../../components/ConfirmModal";

interface LoadingProps {
  onClick: () => Promise<boolean>,
  onSuccess?: () => void,
  defaultText: string,
  loadingText: string,
  disabled?: boolean,
  onFinished?: () => void
}

const LoadingButton: React.FC<LoadingProps> = (
    {
      onClick,
      onSuccess,
      defaultText,
      loadingText,
      disabled,
      onFinished
    }) =>
{
  const [isLoading, setLoading] = useState(false);
    const [onPresentConfirmModal, dismiss] = useModal(<ConfirmModal />)

  const handleClick = () =>  {
      setLoading(true);
      onPresentConfirmModal();
      onClick().then((result) => {
          setLoading(false);
          dismiss();

          if(result && onSuccess !== undefined){
              onSuccess();
          }
          if (onFinished !== undefined) {
              onFinished();
          }
      }) };

  return (
    <Button
      disabled={isLoading || disabled}
      onClick={!isLoading ? handleClick : null}>
        {isLoading ? <div style={{display: 'flex', alignItems: 'center'}}>{loadingText+"  "}<FontAwesomeIcon icon={faSpinner} pulse style={{marginLeft: '5'}}/></div> : <div>{defaultText}</div>}
    </Button>
  );
}


export default LoadingButton
