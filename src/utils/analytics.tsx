import React, { useContext, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import constants from "../constants";
import { selectBrewSettings } from "../redux/brew-settings/slice";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/user/slice";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

interface AnalyticsData {
  firebaseId: string;
  userId: string;
  email: string;
  displayName: string;
  environment: string;
  userAgent: string;
}

function getDefaultAnalyticsData(): AnalyticsData {
  const id = uuid();
  return {
    firebaseId: id,
    userId: id,
    email: "",
    displayName: "Unauthenticated User",
    environment: constants.environment,
    userAgent: window.navigator.userAgent,
  };
}

function sendEvent(name: string, payload: any): void {
  ReactGA.event(name, payload);
}

const AnalyticsContext = React.createContext<{
  analyticsData: AnalyticsData;
  shouldSendEvents: boolean;
}>(null);

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(null);
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const brewSettings = useAppSelector(selectBrewSettings);
  const sendEvents = constants.environment === "production";

  useEffect(() => {
    if (!isInitialized && sendEvents) {
      ReactGA.initialize("G-4HGTT0YXYQ");
      setIsInitialized(true);
    }
  }, [isInitialized, sendEvents]);

  useEffect(() => {
    let newData: AnalyticsData;
    if (user) {
      newData = {
        firebaseId: user.uid ?? "",
        userId: brewSettings.id ?? "",
        email: brewSettings.email ?? "",
        displayName: brewSettings.displayName ?? "",
        environment: constants.environment,
        userAgent: window.navigator.userAgent,
      };
    } else {
      newData = getDefaultAnalyticsData();
    }

    setAnalyticsData(newData);
    ReactGA.set(newData);
  }, [user, brewSettings]);

  useEffect(() => {
    if (isInitialized && sendEvents) {
      ReactGA.send({
        hitType: "pageview",
        page_title: location.pathname,
      });
    }
  }, [location.pathname]);

  return (
    <AnalyticsContext.Provider
      value={{
        analyticsData,
        shouldSendEvents: isInitialized && sendEvents,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const { analyticsData, shouldSendEvents } = useContext(AnalyticsContext);

  function fireAnalyticsEvent(
    eventName: string,
    extraParams: { [key: string]: any } = {}
  ) {
    if (shouldSendEvents) {
      const eventPayload = {
        ...analyticsData,
        ...extraParams,
      };
      sendEvent(eventName, eventPayload);
    }
  }

  return { fireAnalyticsEvent };
};
