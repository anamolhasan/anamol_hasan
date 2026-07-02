import { REFRESH_MESSAGES } from "./LoaderMessages";

export function getRandomMessage() {
  const index = Math.floor(
    Math.random() * REFRESH_MESSAGES.length
  );

  return REFRESH_MESSAGES[index];
}