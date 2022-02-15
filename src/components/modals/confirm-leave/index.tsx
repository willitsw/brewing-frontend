import { useCallback, useContext, useEffect } from "react";
import {
  pageIsClean,
  setPageIsClean,
} from "../../../redux/global-modals/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { History, Blocker, Transition } from "history";
import { UNSAFE_NavigationContext } from "react-router-dom";

const ConfirmLeaveModal = () => {
  const shouldAllowNavigation = useAppSelector(pageIsClean);

  useEffect(() => {
    window.addEventListener("beforeunload", (event) => {
      console.log("set before unload");
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to exit?");
    });
  }, []);

  usePrompt(
    "You have unsaved changes. Are you sure you want to leave?",
    !shouldAllowNavigation
  );

  return null;
};

export default ConfirmLeaveModal;

function useBlocker(blocker: Blocker, when = true): void {
  const navigator = useContext(UNSAFE_NavigationContext).navigator as History;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

function usePrompt(message: any, when = true) {
  const dispatch = useAppDispatch();

  const blocker = useCallback(
    (tx) => {
      if (window.confirm(message)) {
        dispatch(setPageIsClean(true));
        tx.retry();
      }
    },
    [message]
  );

  useBlocker(blocker, when);
}
