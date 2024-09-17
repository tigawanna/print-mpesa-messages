// const A4_HEIGHT = 1100; // A4 height in pixels

import { Message } from "../types";

// const AVG_LINE_CHAR_COUNT_AT_20_PX = 45;
export const A4_WIDTH = 790;
export const LINE_COUNT_AT_20_PX = 40;

export function countLinesinMessage(A4_WIDTH: number,msg?: Message) {
  return msg?.text ? Math.ceil((msg.text.length * 16) / A4_WIDTH) : 1;
}
export function countLinesinMessageArray(A4_WIDTH: number,msg?: Message[]) {
  if (!msg) return 0;
  return msg.reduce((acc, msg) => {
    return acc + countLinesinMessage(A4_WIDTH,msg);
  }, 0);
}

export function handleItemLargerThanpage(currLineCount: number, curr: Message,  LINE_COUNT_AT_20_PX: number) {
  const extraPagesRequired = Math.ceil(currLineCount / LINE_COUNT_AT_20_PX);
  const nestedSubArray = [curr];
  for (let i = 0; i < extraPagesRequired; i++) {
    if (i > 0) {
      nestedSubArray.push({ id: Math.random() * 1000, text: "" });
    }
  }
  return nestedSubArray;
}

export function getCurrentPagekey(
  acc: {
    [pageKey: number]: {
      messages: Message[];
      totalLinesCount: number;
    };
  },
  nextItemLinesCount: number,
  LINE_COUNT_AT_20_PX: number,
) {
  const pageArr = Object.entries(acc);
  let pagekey = 0;
  for (let i = 0; i < pageArr.length; i++) {
    if (
      pageArr[i][1].totalLinesCount + nextItemLinesCount <
      LINE_COUNT_AT_20_PX
    ) {
      pagekey = i;
      break;
    }
    pagekey = i + 1;
  }
  return pagekey;
}


export function breakMesagesArrayInotPages(messages: Message[]) {
    const messagePages = messages.reduce(
      (acc, curr) => {
        const currLineCount = countLinesinMessage(A4_WIDTH,curr);
        const currentPageKey = getCurrentPagekey(
          acc,
          currLineCount,
          LINE_COUNT_AT_20_PX,
        );
        const currentPage = acc?.[currentPageKey];
        const currentPageTotalLineCount = countLinesinMessageArray(
          A4_WIDTH,
          currentPage?.messages,
        );
        const currentMessages = currentPage?.messages ?? [];

        if (currentPageTotalLineCount + currLineCount <= LINE_COUNT_AT_20_PX) {
          acc[currentPageKey] = {
            totalLinesCount: currentPageTotalLineCount + currLineCount,
            messages: [...currentMessages, curr],
          };
        } else if (
          currentPageTotalLineCount + currLineCount >
          LINE_COUNT_AT_20_PX
        ) {
          acc[currentPageKey + 1] = {
            totalLinesCount: currLineCount,
            messages: [...handleItemLargerThanpage(currLineCount, curr, LINE_COUNT_AT_20_PX)],
          };
        } else {
          console.log("else block");
        }
        return acc;
      },
      {} as {
        [pageKey: number]: {
          messages: Message[];
          totalLinesCount: number;
        };
      },
    );
    return messagePages;
}
