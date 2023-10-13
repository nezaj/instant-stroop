export function capitalize(str) {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isAlphanumeric(str) {
  return /^[a-z0-9]+$/.test(str.toLowerCase());
}
