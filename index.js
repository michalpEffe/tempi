const { Command } = require('commander');
const fs = require('fs');
const os = require('os');
const path = require('path');

const program = new Command();

program.name('tempi')
  .description('A time tracking tool')
  .version('0.0.1');

program
  .argument('<string>', 'activity name')
  .option('-l, --log', 'show log of activity',)
  .argument('<string>', 'description')

program.parse();
const options = program.opts()

const activityName = program.args[0];
const log = program.args[1];

const homeDir = os.homedir();
const filePath = path.join(homeDir, activityName);

if (options.log) {
  // display file activityName content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
  return
}

// save to file named activityName with log as content in new line. save file in home directory
const completeLog = `[${new Date().toISOString()}]: ${log}`;

fs.appendFile(filePath, '\n' + completeLog + '\n', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Log saved');
}
);



