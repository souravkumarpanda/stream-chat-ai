"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgent = void 0;
const stream_chat_1 = require("stream-chat");
const serverClient_1 = require("../serverClient");
const OpenAIAgent_1 = require("./openai/OpenAIAgent");
const types_1 = require("./types");
const createAgent = async (user_id, platform, channel_type, channel_id) => {
    const token = serverClient_1.serverClient.createToken(user_id);
    const chatClient = new stream_chat_1.StreamChat(serverClient_1.apiKey, undefined, {
        allowServerSideConnect: true,
    });
    await chatClient.connectUser({ id: user_id }, token);
    const channel = chatClient.channel(channel_type, channel_id);
    await channel.watch();
    switch (platform) {
        case types_1.AgentPlatform.WRITING_ASSISTANT:
        case types_1.AgentPlatform.OPENAI:
            return new OpenAIAgent_1.OpenAIAgent(chatClient, channel);
        default:
            throw new Error(`Unsupported agent platform: ${platform}`);
    }
};
exports.createAgent = createAgent;
//# sourceMappingURL=createAgent.js.map