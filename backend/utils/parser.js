
export function parseCommand(text) {
  text = text.toLowerCase();

  let action = null;

  if (/add|insert/.test(text)) action = "ADD";
  else if (/update|set/.test(text)) action = "UPDATE";
  else if (/reduce|remove|deduct/.test(text)) action = "REDUCE";
  else if (/show|check|display/.test(text)) action = "VIEW";

  const quantityMatch = text.match(/\d+/);
  const quantity = quantityMatch ? parseInt(quantityMatch[0]) : null;

  const words = text.split(" ");
  const item = words[words.length - 1];

  return { action, quantity, item };
}
