import { getDateTime } from "./dateTime.js";
import {readFile, writeFile, deleteFile} from "./file.js"
// All tools combined for the agent
export const tools = {
    getDateTime,
    readFile,
    writeFile,
    deleteFile,
};