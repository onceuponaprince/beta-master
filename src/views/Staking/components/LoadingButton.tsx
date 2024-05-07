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
}

const LoadingButton: React.FC<LoadingProps> = (
    {
      onClick,
      onSuccess,
      defaultText,
      loadingText,
      disabled,
    }) =>
{
  const [isLoading, setLoading] = useState(false);
    const [onPresentConfirmModal] = useModal(<ConfirmModal />)

  const handleClick = () =>  {
      setLoading(true);
      onPresentConfirmModal();
      onClick().then((result) => {
          setLoading(false);

          if(result && onSuccess !== undefined){
              onSuccess();
          }
      }) };

  return (
    <Button
      disabled={isLoading || disabled}
      onClick={!isLoading ? handleClick : null}>
        {isLoading ? <div>{loadingText+"  "}<FontAwesomeIcon icon={faSpinner} pulse/></div> : <div>{defaultText}</div>}

    </Button>
  );
}

export default LoadingButton
