/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import "./jobs.scss";

import React from "react";
import { observer } from "mobx-react";
import { KubeObjectListLayout } from "../kube-object-list-layout";
import kebabCase from "lodash/kebabCase";
import { KubeObjectStatusIcon } from "../kube-object-status-icon";
import { SiblingsInTabLayout } from "../layout/siblings-in-tab-layout";
import { KubeObjectAge } from "../kube-object/age";
import type { JobStore } from "./store";
import type { EventStore } from "../+events/store";
import type { FilterByNamespace } from "../+namespaces/namespace-select-filter-model/filter-by-namespace.injectable";
import { prevDefault } from "../../utils";
import { withInjectables } from "@ogre-tools/injectable-react";
import eventStoreInjectable from "../+events/store.injectable";
import filterByNamespaceInjectable from "../+namespaces/namespace-select-filter-model/filter-by-namespace.injectable";
import jobStoreInjectable from "./store.injectable";

enum columnId {
  name = "name",
  namespace = "namespace",
  completions = "completions",
  conditions = "conditions",
  age = "age",
}

interface Dependencies {
  jobStore: JobStore;
  eventStore: EventStore;
  filterByNamespace: FilterByNamespace;
}

@observer
class NonInjectedJobs extends React.Component<Dependencies> {
  render() {
    const {
      eventStore,
      filterByNamespace,
      jobStore,
    } = this.props;

    return (
      <SiblingsInTabLayout>
        <KubeObjectListLayout
          isConfigurable
          tableId="workload_jobs"
          className="Jobs"
          store={jobStore}
          dependentStores={[eventStore]} // status icon component uses event store
          sortingCallbacks={{
            [columnId.name]: job => job.getName(),
            [columnId.namespace]: job => job.getNs(),
            [columnId.conditions]: job => job.getCondition()?.type,
            [columnId.age]: job => -job.getCreationTimestamp(),
          }}
          searchFilters={[
            job => job.getSearchFields(),
          ]}
          renderHeaderTitle="Jobs"
          renderTableHeader={[
            { title: "Name", className: "name", sortBy: columnId.name, id: columnId.name },
            { title: "Namespace", className: "namespace", sortBy: columnId.namespace, id: columnId.namespace },
            { title: "Completions", className: "completions", id: columnId.completions },
            { className: "warning", showWithColumn: columnId.completions },
            { title: "Age", className: "age", sortBy: columnId.age, id: columnId.age },
            { title: "Conditions", className: "conditions", sortBy: columnId.conditions, id: columnId.conditions },
          ]}
          renderTableContents={job => {
            const condition = job.getCondition();

            return [
              job.getName(),
              <a
                key="namespace"
                className="filterNamespace"
                onClick={prevDefault(() => filterByNamespace(job.getNs()))}
              >
                {job.getNs()}
              </a>,
              `${job.getCompletions()} / ${job.getDesiredCompletions()}`,
              <KubeObjectStatusIcon key="icon" object={job} />,
              <KubeObjectAge key="age" object={job} />,
              condition && {
                title: condition.type,
                className: kebabCase(condition.type),
              },
            ];
          }}
        />
      </SiblingsInTabLayout>
    );
  }
}

export const Jobs = withInjectables<Dependencies>(NonInjectedJobs, {
  getProps: (di, props) => ({
    ...props,
    eventStore: di.inject(eventStoreInjectable),
    filterByNamespace: di.inject(filterByNamespaceInjectable),
    jobStore: di.inject(jobStoreInjectable),
  }),
});
