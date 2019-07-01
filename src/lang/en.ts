import * as Admin from './en/admin';
import * as BNet from './en/bnet';
import * as ChastiKey from './en/chastikey';
import * as Decision from './en/decision';
import * as Error from './en/error';
import * as HelpStrings from './en/help';
import * as Poll from './en/poll';

export const en = {
  admin: {
    botManualRestart: Admin.botManualRestart,
  },
  bnet: {
    bnetCharacterNotFound: BNet.bnetCharacterNotFound
  },
  chastikey: {
    adminRefreshStats: ChastiKey.adminRefreshStats,
    invalidOverrideType: ChastiKey.invalidOverrideType,
    incorrectTickerTimer: ChastiKey.incorrectTickerTimer,
    lockeeCommandNotification: ChastiKey.lockeeCommandNotification,
    lockeeOrKeyholderRequired: ChastiKey.lockeeOrKeyholderRequired,
    keyholderNoLocks: ChastiKey.keyholderNoLocks,
    keyholderCommandNotification: ChastiKey.keyholderCommandNotification,
    usernameNotSet: ChastiKey.usernameNotSet,
    userRequestedNoStats: ChastiKey.userRequestedNoStats
  },
  decision: {
    newQuestionAdded: Decision.newQuestionAdded
  },
  error: {
    commandExactMatchFailedOptions: Error.commandExactMatchFailedOptions,
    commandHelpMissing: Error.helpCommandMissing,
    commandDisabledInChannel: Error.commandDisabledInChannel,
    userNotRegistered: Error.userNotRegistered
  },
  help: {
    bnet: HelpStrings.bnet,
    ck: HelpStrings.ck,
    decision: HelpStrings.decision,
    flip: HelpStrings.flip,
    main: HelpStrings.main,
    poll: HelpStrings.poll,
    register: HelpStrings.register,
    roll: HelpStrings.roll,
    stats: HelpStrings.stats,
    /// Used by Main
    main8Ball: HelpStrings.main8Ball,
    mainBNet: HelpStrings.mainBNet,
    mainCK: HelpStrings.mainCK,
    mainDecision: HelpStrings.mainDecision,
    mainFlip: HelpStrings.mainFlip,
    mainPoll: HelpStrings.mainPoll,
    mainRegister: HelpStrings.mainRegister,
    mainRoll: HelpStrings.mainRoll,
    mainStats: HelpStrings.mainStats
    /// Old
    // duration: HelpStrings.duration,
    // intensity: HelpStrings.intensity,
    // limit: HelpStrings.limit,
    // react: HelpStrings.react,

  },
  poll: {
    newPollCreated: Poll.newPollCreated,
    pollNotFoundInDB: Poll.pollNotFoundInDB,
    pollPropertyNotFound: Poll.pollPropertyNotFound,
    pollPropertyUpdated: Poll.pollPropertyUpdated,
    pollVoteCast: Poll.pollVoteCast,
    pollVoteRemoved: Poll.pollVoteRemoved,
    pollExpired: Poll.pollExpired,
    pollDifferentAuthorID: Poll.pollDifferentAuthorID,
    pollRandomVoteSelected: Poll.pollRandomVoteSelected,
    pollEnded: Poll.pollEnded,
    pollOptionAdded: Poll.pollOptionAdded,
    pollOptionRemoved: Poll.pollOptionRemoved,
    pollOptionNotFound: Poll.pollOptionNotFound
  }
}