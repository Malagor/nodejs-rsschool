import chalk from 'chalk';

export function coloredStatusCode(statusCode: number): string {
  const statusCodeSection = statusCode.toString().charAt(0);

  switch (statusCodeSection) {
    case '2':
      return chalk.green(statusCode);
    case '3':
      return chalk.yellow(statusCode);
    case '4':
    case '5':
      return chalk.red(statusCode);
    default:
      return statusCode.toString();
  }
}
