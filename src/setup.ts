import * as dockerCompose from 'docker-compose';
import * as path from 'path';

(async () => {
  await dockerCompose.upAll({
    cwd: path.join(__dirname),
    log: true,
  });
  await dockerCompose.exec(
    'mysql',
    [
      'sh',
      '-c',
      'until mysql -h 127.0.0.1 -u root -p1234  --silent -e "show databases;"; do sleep 5; done',
    ],
    {
      cwd: path.join(__dirname),
    },
  );
})()
  .then((result) => {
    console.log(result);
    process.exit(1);
  })
  .catch((err) => {
    console.error(err);
  });
