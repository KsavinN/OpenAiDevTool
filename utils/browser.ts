import puppeteer from 'puppeteer';

export const getPageContent = async (url: string, timeout = 60000) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { timeout });
    const content = await page.content();
    return content;
  } catch (error) {
    console.log('Error in getPageContent', error);
  } finally {
    await browser.close();
  }
}


export function stripHtml(html: string) {
  if (typeof html !== "string") {
    throw new TypeError("Expected a string");
  }
  return html.replace(/(<([^>]+)>)/gi, "");
}