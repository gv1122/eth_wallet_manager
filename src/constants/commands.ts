import { Command } from '../types/command';
import { Hello } from '../commands/hello';
import { Start } from '../commands/start';
import { Manage } from '../commands/manage';
import { Help } from '../commands/help';
import { Support } from '../commands/support';

export const Commands: Command[] = [Manage, Help, Support, Hello, Start];
