import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response, db) {
    readDatabase(db).then((names) => {
      const res = ['This is the list of our students'];

      for (const x of Object.keys(names)) {
        const msg = `Number of students in ${x}: ${names[x].length}. List: ${names[x].join(', ')}`;
        res.push(msg);
      }
      return response.send(200, `${res.join('\n')}`);
    }).catch(() => response.send(500, 'Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response, db) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.send(500, 'Major parameter must be CS or SWE');
    } else {
      readDatabase(db).then((names) => {
        const students = names[major];
        response.send(200, `List: ${students.join(', ')}`);
      }).catch(() => response.send(500, 'Cannot load the database'));
    }
  }
}

export default StudentsController;
