import { performance } from 'perf_hooks'
import { RouterRouted, ExportRoutes } from '@/router'
import { TrackedMessage } from '@/objects/message'
import { pongResponse } from '@/embedded/ping-pong'
import { TrackedBotSetting } from '@/objects/setting'

export const Routes = ExportRoutes(
  {
    type: 'message',
    category: 'Info',
    controller: versionCheck,
    description: 'Help.Admin.BotVersion.Description',
    example: '{{prefix}}version',
    name: 'admin-version',
    validate: '/version:string',
    permissions: { serverOnly: false }
  },
  {
    type: 'message',
    category: 'Info',
    controller: pingPong,
    description: 'Help.Admin.BotPing.Description',
    example: '{{prefix}}ping',
    name: 'admin-ping',
    validate: '/ping:string',
    permissions: { serverOnly: false }
  },
  {
    type: 'message',
    category: 'Admin',
    controller: forceRestart,
    description: 'Help.Admin.BotRestart.Description',
    example: '{{prefix}}admin restart bot',
    name: 'root-restart-bot',
    permissions: {
      restricted: true,
      restrictedTo: [
        '715198203598864485', //Johanna
        '491343519374376962', //Puzzle
	    '209056319905202176' //meins
      ]
    },
    validate: '/admin:string/restart:string/bot:string/seconds?=number'
  },
  {
    type: 'message',
    category: 'Admin',
    controller: setStatus,
    description: 'Help.Admin.SetStatus.Description',
    example: '{{prefix}}admin bot status message "Message Here"',
    name: 'root-status-bot',
    permissions: {
      restricted: true,
      restrictedTo: [
        '715198203598864485',  //Johanna
		'209056319905202176' //meins
      ]
    },
    validate: '/admin:string/bot:string/status:string/message:string/text=string'
  }
)

export async function pingPong(routed: RouterRouted) {
  const startTime = performance.now()

  // Track all incoming messages
  await routed.bot.MsgTracker.trackMsg(
    new TrackedMessage({
      authorID: routed.message.author.id,
      id: routed.message.id,
      messageCreatedAt: routed.message.createdAt.getTime(),
      channelId: routed.message.channel.id,
      // Flags
      flagAutoDelete: true,
      flagTrack: true,
      // Deletion settings
      storageKeepInChatFor: 10000
    })
  )

  const ms = Math.round((performance.now() - startTime) * 100) / 100
  const response = await routed.message.reply(
    pongResponse(routed.bot.BotMonitor.DBMonitor.pingTotalLatency / routed.bot.BotMonitor.DBMonitor.pingCount, routed.routerStats.performance)
  )

  if (!Array.isArray(response)) {
    await routed.bot.MsgTracker.trackMsg(
      new TrackedMessage({
        authorID: response.author.id,
        id: response.id,
        messageCreatedAt: response.createdAt.getTime(),
        channelId: response.channel.id,
        // Flags
        flagAutoDelete: true,
        flagTrack: true,
        // Deletion settings
        storageKeepInChatFor: 10000
      })
    )
  }

  routed.bot.Log.Command.log(`${routed.message.content} response => pong ${ms}ms`)
  return true
}

/**
 * Gets the bot's current `package.json` version string
 * @export
 * @param {RouterRouted} routed
 */
export async function versionCheck(routed: RouterRouted) {
  routed.message.channel.send(`Running on version \`${routed.bot.version}\``)
  return true
}

export async function forceRestart(routed: RouterRouted) {
  await routed.message.channel.send(
    routed.$render('Admin.BotManualRestart', {
      seconds: (routed.v.o.seconds || 5000) / 1000
    })
  )

  setTimeout(() => {
    process.exit(0)
  }, routed.v.o.seconds || 5000)

  // Successful end
  return true
}

export async function setStatus(routed: RouterRouted) {
  // Store status in db in the event of a restart
  await routed.bot.DB.update(
    'settings',
    { key: 'bot.status.message' },
    new TrackedBotSetting({ added: Date.now(), author: routed.message.author.id, env: '*', key: 'bot.status.message', value: routed.v.o.text, updated: Date.now() }),
    { upsert: true }
  )

  // Set the status
  await routed.bot.client.user.setPresence({ activity: { name: routed.v.o.text || '' }, status: 'online' })

  return true
}
