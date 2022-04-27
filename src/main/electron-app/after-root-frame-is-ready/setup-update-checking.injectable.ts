/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { afterRootFrameIsReadyInjectionToken } from "../../start-main-application/after-root-frame-is-ready/after-root-frame-is-ready-injection-token";
import { startUpdateChecking } from "../../app-updater";
import isAutoUpdateEnabledInjectable from "../../is-auto-update-enabled.injectable";

const setupUpdateCheckingInjectable = getInjectable({
  id: "setup-update-checking",

  instantiate: (di) => {
    const isAutoUpdateEnabled = di.inject(isAutoUpdateEnabledInjectable);

    return {
      run: () => {
        startUpdateChecking(isAutoUpdateEnabled)();
      },
    };
  },

  causesSideEffects: true,

  injectionToken: afterRootFrameIsReadyInjectionToken,
});

export default setupUpdateCheckingInjectable;
