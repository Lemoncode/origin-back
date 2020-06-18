import { prompt } from 'inquirer';

const testRunners = {};

(async () => {
  let exit = false;
  while (!exit) {
    const { testRunner } = await prompt([
      {
        name: 'testRunner',
        type: 'list',
        message: 'Which test-runner do you want to run?',
        choices: [...Object.keys(testRunners), 'exit'],
      },
    ]);

    if (testRunner !== 'exit') {
      await testRunners[testRunner]();
    } else {
      exit = true;
    }
  }
})();
