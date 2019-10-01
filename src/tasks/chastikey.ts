import { Collections } from '../db/database';
import { ChastiKeyAPIFetchAndStore } from './templates/ck-api-fetch-store';
import { ChastiKeyEventRoleMonitor } from './templates/ck-locktober-monitor';

export class ChastiKeyAPIRunningLocks extends ChastiKeyAPIFetchAndStore {
  // Setting the props for this Task
  name = 'ChastiKeyAPIRunningLocks'
  APIEndpoint = `https://chastikey.com/json/v1.0/kiera_running_locks.json`
  frequency = (1800000 / 2) // 15 minutes (this is the refresh rate of this data)
  dbCollection: Collections = 'ck-running-locks'
}

export class ChastiKeyAPIKeyholders extends ChastiKeyAPIFetchAndStore {
  // Setting the props for this Task
  name = 'ChastiKeyAPIKeyholders'
  APIEndpoint = `https://chastikey.com/json/v1.0/kiera_keyholders_data.json`
  frequency = (1800000 / 2) // 15 minutes (this is the refresh rate of this data)
  dbCollection: Collections = 'ck-keyholders'
}

export class ChastiKeyAPILockees extends ChastiKeyAPIFetchAndStore {
  // Setting the props for this Task
  name = 'ChastiKeyAPILockees'
  APIEndpoint = `https://chastikey.com/json/v1.0/kiera_lockees_data.json`
  frequency = (1800000 / 2) // 15 minutes
  dbCollection: Collections = 'ck-lockees'
}

export class ChastiKeyAPITotalLockedTime extends ChastiKeyAPIFetchAndStore {
  // Setting the props for this Task
  name = 'ChastiKeyAPITotalLockedTime'
  APIEndpoint = `https://www.chastikey.com/json/v1.0/kiera_total_lock_times.json`
  frequency = 1800000 // 30 minutes
  dbCollection: Collections = 'ck-lockee-totals'
}

// TO be removed in December/January
export class ChastiKeyAPILocktober extends ChastiKeyAPIFetchAndStore {
  // Setting the props for this Task
  name = 'ChastiKeyAPILocktober'
  APIEndpoint = `https://chastikey.com/json/v1.0/kiera_locked_for_locktober.json`
  frequency = 1800000 // 30 minutes
  dbCollection: Collections = 'ck-locktober'
}

// TO be removed in December/January
export class ChastiKeyBackgroundLocktoberMonitor extends ChastiKeyEventRoleMonitor {
  // Setting the props for this Task
  name = 'ChastiKeyBackgroundLocktoberMonitor'
  frequency = 1800000 // 30 minutes
  dbCollection: Collections = 'ck-locktober'
  eventRole = 'Locktober 2019'
}
