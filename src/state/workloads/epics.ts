import { combineEpics, Epic } from 'redux-observable';
import { delay, filter, mergeMap, map, tap, ignoreElements, takeUntil } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { from } from 'rxjs';
import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import moment from 'moment';
import {WorkloadService} from './services';


type AppEpic = Epic<RootAction, RootAction, RootState>;
let workloadService = new WorkloadService();

const logWorkloadSubmissions: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    tap(action => console.log('Workload submitted', action)),
    mergeMap(action => workloadService.create({complexity: action.payload.complexity})
                   .then(payload => workloadsActions.created(payload))),
  )
);

const cancelWorkflow: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    mergeMap(action => workloadService.cancel({id: action.payload.id})
                   .then(payload => workloadsActions.updateStatus(payload))),
    tap(action => console.log('Workload canceled', action)),
  )
);

const createWorkflow: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.created)),
    tap(action => console.log('Workload created', action)),
    mergeMap(action => new Promise((resolve : (action: RootAction) => void) => {
      const repeater = setInterval(() => {
        workloadService.checkStatus({id: action.payload.id})
          .then(work => {
            if (work.status === 'WORKING') return;
            resolve(workloadsActions.updateStatus({
              id: action.payload.id, status: work.status}));
            clearInterval(repeater);
          });
      }, 100);
    })),
  )
);

export const epics = combineEpics(
  logWorkloadSubmissions,
  cancelWorkflow,
  createWorkflow,
);

export default epics;
