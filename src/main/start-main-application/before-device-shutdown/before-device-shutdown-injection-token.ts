/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectionToken } from "@ogre-tools/injectable";
import type { Runnable } from "../run-many-for";

export const beforeDeviceShutdownInjectionToken = getInjectionToken<Runnable>({
  id: "before-device-shutdown",
});
