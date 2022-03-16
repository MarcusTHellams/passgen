/* eslint-disable no-useless-computed-key */
import { Command, flags } from '@oclif/command';
import clipboardy = require('clipboardy');
import chalk = require('chalk');
import { savePassword } from './save-password';

let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '!@#$%^&*<>?/~';
const numbers = '0123456789';

const generateString = (length: number, chars: string) =>
  new Array(length)
    .fill('')
    .map((_) => chars[Math.floor(Math.random() * chars.length)])
    .join('');

class Passgen extends Command {
  static description =
    'Generate a random password with configurable levels of complexity';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    length: flags.integer({
      char: 'l',
      description: 'length of password',
      default: 8,
    }),
    save: flags.boolean({
      char: 's',
      description: 'save password to passwords.txt',
      default: false,
    }),
    ['no-numbers']: flags.boolean({
      description: 'remove numbers',
      default: false,
    }),
    ['no-symbols']: flags.boolean({
      description: 'remove symbols',
      default: false,
    }),
  };

  async run() {
    const { flags } = this.parse(Passgen);
    if (!flags['no-symbols']) {
      characters = `${symbols}${characters}`;
    }
    if (!flags['no-numbers']) {
      characters = `${numbers}${characters}`;
    }
    const password = generateString(flags.length, characters);
    clipboardy.writeSync(password);
    this.log(chalk.blue(`Generated Password: ${chalk.bold(password)}`));
    this.log(chalk.yellow('Password copied to clipboard'));
    if (flags.save) {
      savePassword(password);
    }
  }
}

export = Passgen;
