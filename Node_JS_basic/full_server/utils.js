const fs = require('fs');

function readDatabase(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      if (err) {
        reject(err);
        return;
      }
      const data = content.toString().split('\n').slice(1, -1);
      const dict = {};
      for (const i of data) {
        const branch = i.slice(i.lastIndexOf(',') + 1);
        if (branch in dict === false) {
          dict[branch] = data.filter((i) => (i.endsWith(branch))).map((j) => (j.slice(0, j.indexOf(','))));
        }
      }
      resolve(dict);
    });
  });
}

export default readDatabase;
