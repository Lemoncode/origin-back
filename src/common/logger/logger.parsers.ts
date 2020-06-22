const obfuscatePassword = (message: string) => {
  return message.replace(
    /password: \\\\\\\".*\\\\\\\"/,
    'password: \\"******\\"'
  );
};

export const parseMessage = (message) => {
  const messageAsString = JSON.stringify(message);
  return obfuscatePassword(messageAsString);
};
