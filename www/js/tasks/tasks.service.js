angular
  .module('instapp.tasksService', [])
  .factory('TasksService', TasksService)

function TasksService () {
  var tasks = {}

  return {
    set: function (t) {
      tasks = t
    },
    get: function () {
      return tasks
    },
    getTask: function (id) {
      for (i = 0; i < tasks.length; i++) {
        if (tasks[i].name === id) {
          return tasks[i]
        }
      }
    }
  }
}
