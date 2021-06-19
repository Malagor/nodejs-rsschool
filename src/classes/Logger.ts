// import { createWriteStream } from 'fs';
// // import chalk from 'chalk';
// // import path from 'path';
// // import { coloredStatusCode } from '../helpers/coloredSratusCode';
// // import { currentTime } from '../helpers/currentTime';
// // import { serialize } from 'v8';
// // import { col } from 'sequelize';
//
// type SeryalizeObjectType = { [key: string]: string };
// export const logger = (
//   file: string
// ): ((
//   serializer: (obj: SeryalizeObjectType) => string
// ) => (kind: string) => (msg: string) => void) => {
//   const { isTTY } = file;
//   const stream = isTTY ? file : createWriteStream(file);
//   return (serializer = logger.defaultSerializer) =>
//     (kind: string) => {
//       const color: string = isTTY
//         ? logger.colors[kind] || logger.colors.info
//         : '';
//       const normal = isTTY ? logger.colors.normal : '';
//
//       return (msg: string) => {
//         const record = { msg };
//         const line = serializer(record);
//         stream.write(`${color + line + normal}\n`);
//       };
//     };
// };
//
// logger.defaultSerializer = (obj: SeryalizeObjectType) =>
//   Object.values(obj).join('\t');
//
// logger.colors = {
//   warning: '\x1b[1;33m',
//   error: '\x1b[0;31m',
//   info: '\x1b[1;37m',
//   normal: '\x1b[0m',
// };
