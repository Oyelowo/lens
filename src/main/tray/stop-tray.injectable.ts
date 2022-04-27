/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import trayInjectable from "./tray.injectable";
import { beforeQuitOfBackEndInjectionToken } from "../start-main-application/before-quit-of-back-end/before-quit-of-back-end-injection-token";

const stopTrayInjectable = getInjectable({
  id: "stop-tray",

  instantiate: (di) => {
    const trayInitializer = di.inject(trayInjectable);

    return {
      run: () => {
        trayInitializer.stop();
      },
    };
  },

  injectionToken: beforeQuitOfBackEndInjectionToken,
});

export default stopTrayInjectable;
