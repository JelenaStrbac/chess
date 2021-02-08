import { useCallback, useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = useCallback(() => {
    setIsShowing((previousValue) => !previousValue);
  }, [setIsShowing]);

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
