const Colors = {
  base: {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m'
  },

  text: {
    fg: {
      black: '\x1b[30m',
      red: '\x1b[31;1m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m'
    },
    bg: {
      black: '\x1b[40m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m'
    }
  }
}

type ColoroutKind = `${'fg' | 'bg'}.${keyof typeof Colors['text']['fg'] | keyof typeof Colors['text']['bg']}`;

export default function colorout(kind: ColoroutKind, message: string) {
  const kindSplitted = kind.split('.');
  const key = kindSplitted[0] as keyof typeof Colors['text'];
  const keyColor = kindSplitted[1] as keyof typeof Colors['text'][`${'fg' | 'bg'}`];
  return `${Colors.text[key][keyColor]}${message}${Colors.base.reset}`;
}