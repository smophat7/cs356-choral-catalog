export function getPurchaseUrlSourceName(url: string): string {
  if (url.includes("jwpepper")) {
    return "JW Pepper";
  } else if (url.includes("musicnotes")) {
    return "Music Notes";
  } else if (url.includes("morningstarmusic")) {
    return "ESC Publishing Group";
  } else if (url.includes("sheetmusicplus")) {
    return "Sheet Music Plus";
  } else if (url.includes("musicroom")) {
    return "Music Room";
  } else {
    const urlWithoutProtocol = url.replace(/^https?:\/\//, "");
    const urlWithoutWww = urlWithoutProtocol.replace(/^www./, "");
    const urlWithoutEverythingAfterFirstSlash = urlWithoutWww.replace(
      /\/.*/,
      ""
    );
    const urlWithoutTrailingSlash = urlWithoutEverythingAfterFirstSlash.replace(
      /\/$/,
      ""
    );
    return urlWithoutTrailingSlash;
  }
}
