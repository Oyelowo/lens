/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import catalogSyncToRendererInjectable from "./catalog-sync-to-renderer.injectable";
import { beforeQuitOfFrontEndInjectionToken } from "../start-main-application/before-quit-of-front-end/before-quit-of-front-end-injection-token";

const stopCatalogSyncInjectable = getInjectable({
  id: "stop-catalog-sync",

  instantiate: (di) => {
    const catalogSyncToRenderer = di.inject(catalogSyncToRendererInjectable);

    return {
      run: () => {
        catalogSyncToRenderer.stop();
      },
    };
  },

  injectionToken: beforeQuitOfFrontEndInjectionToken,
});

export default stopCatalogSyncInjectable;
