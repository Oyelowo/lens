/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import appNameInjectable from "../../app-paths/app-name/app-name.injectable";
import { beforeApplicationIsReadyInjectionToken } from "../../start-main-application/before-application-is-ready/before-application-is-ready-injection-token";
import electronAppInjectable from "../electron-app.injectable";

const setupApplicationNameInjectable = getInjectable({
  id: "setup-application-name",

  instantiate: (di) => {
    const app = di.inject(electronAppInjectable);
    const appName = di.inject(appNameInjectable);

    return {
      run: () => {
        app.setName(appName);
      },
    };
  },

  injectionToken: beforeApplicationIsReadyInjectionToken,
});

export default setupApplicationNameInjectable;
