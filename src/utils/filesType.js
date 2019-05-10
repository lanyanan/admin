/**
 * 文件分类
 * creat: lisa
 * date: 2018-8-15
 */

// pdf files icon
import pdfIcon from 'assets/images/pdf.png';
// .doc files icon
const docIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAAAAXNSR0IArs4c6QAAAV9JREFUOBHtlL1KA0EQgL87TZGgUZFUKkREDAnERrAQQR9DrMRWn8DHsBZLH8AHULBMYZLSwh80jYJRTDSiss5EzrvsnZBLbAQH7m53fr6ZWW7W2S6ZPeOwgcGhS1nKcLyWdVZtdzcuSAFTKVYOLs1RCBanomBwFNANOsRd28C+YJo8COwJdt3s7MEDOlslYzpNve96quyndH8ItlOAzRm/kcVx2F2A5YyvW8+C+tkSarNSh7k0eIbiKLQ+oDjmh+ZH4FT8bPFivvXlB0gOwPQQJGRacwI+rMGs7FU/mYJ0AjSpLSHYzTPcv4Jmz8nTeIeTW2hKdQXZq/6uBbUXGwWDYRWU619BWkFVKtUfsSq6eWl1WCLUHiWhytSpIoCJpATLeXmBCs1Ly9q+2qMksrKLBjy+0b7gzmWtcvYE0ilN0V9Z49R2kNf/OHkn0f3XlVP+nStIOK5j2O8bKCDlfAIKqWb8KpwiiQAAAABJRU5ErkJggg==';

// .xls files icon
const xlsIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAAAAXNSR0IArs4c6QAAAW1JREFUOBFjjD47Z+5/BoZEhv//GRmIBE5iGgdS5Gwd0ZUzkWoQyABFThGHOY8O78cwjBQXIWvGZiATsgJS2egGUmQYyHJkA8ky7P63NyiegBnIgiJKJGff6xvYVDqQ5TJsJoHEhqBhtsKqDEuNUxiiZMzgvvIU0wGLuYlqwcWQGTgj4PDb2wzSHAIMvhL6DLe+vGT49vcXQyTQ4J2vrjLsen0N2Qw4G6dhIBUrn55mkAQamK5gz/D3/z+Gix+fMCx+fAKuGZ2BNwKA+ZZhzbOzDFzMbAy8LBwMq5+dYfgPhLgAXsM4mVkZchUdGV78+Mjw+udnhhwgGySGC+A0jJGBkSFPyZlBmI2Hoe/ubob+u3sYRNl5GfKBYkxAOWwAp2FxspYMenwyDLMeHmJ4+uMDw8PvbxnmPjzCoMUrxRAra4HNLAbGqDOzcQcCVi24BXG6DLcW3DKD2TBGRuqEGdAcJmAkz2eg1ECgfpA5AECvbLwYsoL4AAAAAElFTkSuQmCC';

// .jpg / .gif ... files icon
const picIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAAAAXNSR0IArs4c6QAAAVpJREFUOBG9lbtKA0EUhr+RFRUhIkICElEEg3gJgqgRm9hpYSsoWNiJmGfwSSSN4AvYemksBfEBBBUiWHmrvGQ9YwLJrGdlNxs8MOzMuXznnwO7a/zj0gH42/gYotrw0rnJbywH0ztigywhNVT0r4/OfsPiKGquVoCiLIEFgMlgVkcTsDXY8717nTrQc70RT3cXWmKxNWUaSnz/ABvIwdwOZOdDNOhuXdn0OmQmIb8p2pWxWp9tGDAd9nRbS3t9gOqnW+J1Q6EEi7K6Uk5MaSvxq0O4OYW3RycZrwcWdqF/xPXXT7oyeet5qcD4GqSnaqmdAirshYJskq7MRnKrMCofBrsql9Cbgb6sjYSaDktPwNhKo2hwtrH/Y6dc08DMFhh5xjRFmczrZF9gSh8L9yVuZ2qf1Q+nnQKT+Ne7kxT1ENI+armb12aYsQNogwlHlJmy/JeSAX/qTfkbTUlJsHvsJrEAAAAASUVORK5CYII=';

//  .zip files icon
const compressIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAAAAXNSR0IArs4c6QAAAPtJREFUOBFjYBgRgDH3zP/D//8z2GDz7eSuZIgwJwcDg48bA4M3ECfkgMVyy+aiaGFkZDjChMsgFJV9zRBuUS2KMDIHZA4TsgBOdmsfRKqmCKcSkARxhmUkQgyZPp8Khq3eCDEk1J8KhjnZQgzZdxivYSyTedLxKgBLXrzCwCAsxMBgoMPAcOIMWAibPuLCTEYaYuHjp3gtJs6w798hhnBxUsGwb1DDOKlhmCzUm0+o4c0LwAgAAX1gBOABLNFfTXFKL2U4DpEDJY3bdxkYkJIGNn3ERQBVE20mNDvNoEZ2aoFm9GqCGZ3xCM5Ag0kQUQQxMBBhDsy8oU0DAKFzOxIIbIr1AAAAAElFTkSuQmCC';

// .ppt files icon
const pptIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAAAAXNSR0IArs4c6QAAAQxJREFUOBFj/N9VPpeB4X8iw38GRgZigaHFAUa3IEd05UwkGwQyQUzK4f+udfsxDSPFRci6sRgIdBkFAM1AygwDuQPJQPIMe/EU1TtQA1lQRYnkXTzJwHARQ60DeS7DMAciMHgNwx9mZZ2oHvr4noFh5zoGhge3UMWhPMLePLGPgWE1MMetW8DAADLM2RerQSBB/C4DqXj5nIHhPtQlbOwMDB6hIFGsgLBh4tIMDL9/Aa1lZWDQM2NgePMCq0EgQcKGGVszMBhaQgz4+JaBYcdaCgzbtoqB4eYlnAYgSxCOAGTVBNhUNQx/mHWVE3ALqjRVXUZlwxiBVQk1ANAcoMsY5wPrJcoMBOtnnA8AFRBDkLbGqDkAAAAASUVORK5CYII=';

/**
 * 定义扩展显示
 */
export const fileExt = {
  rar: {
    type: '压缩文件',
    icon: compressIcon,
  },
  zip: {
    type: '压缩文件',
    icon: compressIcon,
  },
  jpeg: {
    type: '图片',
    icon: picIcon,
  },
  png: {
    type: '图片',
    icon: picIcon,
  },
  jpg: {
    type: '图片',
    icon: picIcon,
  },
  gif: {
    type: '图片',
    icon: picIcon,
  },
  'vnd.ms-excel': {
    type: 'Excel 文件',
    icon: xlsIcon,
  },
  xls: {
    type: 'Excel 文件',
    icon: xlsIcon,
  },
  xlt: {
    type: 'Excel 文件',
    icon: xlsIcon,
  },
  xlsx: {
    type: 'Excel 文件',
    icon: xlsIcon,
  },
  ett: {
    type: 'Excel 文件',
    icon: xlsIcon,
  },
  et: {
    type: 'Excel 文件',
    icon: xlsIcon,
  },
  ppt: {
    type: 'PPT文件',
    icon: pptIcon,
  },
  pptx: {
    type: 'PPT文件',
    icon: pptIcon,
  },
  doc: {
    type: 'WORD文件',
    icon: docIcon,
  },
  docx: {
    type: 'WORD文件',
    icon: docIcon,
  },
  pdf: {
    type: 'PDF文件',
    icon: pdfIcon,
  },
};

/**
 * @description 显示文件大小带单位
 * @param {string} bytes
 * @returns {string} 带单位的文件大小
 */
export const bytesToSize = (bytes) => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / (1024 ** i), 2)}${sizes[i]}`;
};
