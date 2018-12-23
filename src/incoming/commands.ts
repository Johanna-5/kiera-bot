import { performance } from "perf_hooks";
import { Bot } from "..";
import { Message, Channel } from "discord.js";
import { TrackedMessage } from "../message";

export async function pingPong(bot: Bot, msg: Message) {
  const startTime = performance.now()
  const channel = msg.channel

  // Track all incoming messages
  bot.MsgTracker.trackMsg(new TrackedMessage({
    author_id: msg.author.id,
    author_username: msg.author.username,
    message_id: msg.id,
    message_createdAt: msg.createdAt.getTime(),
    channel_id: msg.channel.id,
    // Flags
    flag_auto_delete: true,
    flag_track: true
  }))

  const ms = Math.round((performance.now() - startTime) * 100) / 100
  const response = await channel.sendMessage(`pong ${ms}ms`);

  if (!Array.isArray(response)) {
    bot.MsgTracker.trackMsg(new TrackedMessage({
      author_id: response.author.id,
      author_username: response.author.username,
      message_id: response.id,
      message_createdAt: response.createdAt.getTime(),
      channel_id: response.channel.id,
      // Flags
      flag_auto_delete: true,
      flag_track: true
    }))
  }

  bot.DEBUG_MSG_INCOMING(`${msg.content} response => pong ${ms}ms`)
}

export async function versionCheck(bot: Bot, msg: Message) {
  await msg.channel.send(bot.version, { code: true })
}

export * from './user'
export * from './devices'
export * from './react'
export * from './duration'