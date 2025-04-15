// Description: Custom hook to check network connectivity using NetInfo
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useNetInfo = (): boolean => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected === true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};
