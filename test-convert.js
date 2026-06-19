const { convertToModelMessages } = require('ai');

const sanitizedMessages = [
  { role: 'user', parts: [{ type: 'text', text: 'Say "hello playwright"' }] }
];

convertToModelMessages(sanitizedMessages).then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
