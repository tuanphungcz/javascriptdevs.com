import * as migration_20241112_084401 from './20241112_084401';

export const migrations = [
  {
    up: migration_20241112_084401.up,
    down: migration_20241112_084401.down,
    name: '20241112_084401'
  },
];
