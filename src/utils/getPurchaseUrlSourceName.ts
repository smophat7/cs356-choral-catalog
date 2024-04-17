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
  } else if (url.includes("lorenz")) {
    return "Lorenz Corp.";
  } else if (url.includes("brileemusic")) {
    return "BriLee Music";
  } else if (url.includes("stantons")) {
    return "Stanton's Sheet Music";
  } else if (url.includes("alfred")) {
    return "Alfred Music";
  } else if (url.includes("totalsheetmusic")) {
    return "Total Sheet Music";
  } else if (url.includes("sheetmusicauthority")) {
    return "Sheet Music Authority";
  } else if (url.includes("carlfischer")) {
    return "Carl Fischer";
  } else if (url.includes("willispianomusic")) {
    return "Willis Piano Music";
  } else if (url.includes("halleonard")) {
    return "Hal Leonard";
  } else if (url.includes("poddbrothers")) {
    return "Podd Brothers";
  } else if (url.includes("sheetmusicdirect")) {
    return "Sheet Music Direct";
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
