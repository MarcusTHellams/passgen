/* eslint-disable no-console */
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import chalk = require('chalk');
const log = console.log;
const e = console.error;

export const savePassword = async (password: string) => {
  try {
    const id = await fs.open(path.join(__dirname, '../', 'password.txt'), 'a');
    await fs.write(id, `${password}${os.EOL}`, undefined, 'utf-8');
    await fs.close(id);
    log(
      chalk.green(
        `Password saved to ${path.resolve(__dirname, '../', 'password.txt')}`
      )
    );
  } catch (error) {
    e(chalk.red(error));
  }
};
