/*
 * Tasks service module
 *
 * This is a helper service that is used for sharing a common list of
 * tasks between different modules and their controllers. Angular services
 * can store information while the app is running.
 */

angular
  .module('instapp.tasksService', [])
  .factory('TasksService', TasksService)

function TasksService () {
  var tasks = {}

  return {
    // Set tasks list
    set: function (t) {
      tasks = t
    },
    // Get tasks list
    get: function () {
      return tasks
    },
    // Get a task from the tasks list. Mac address is used as a unique id.
    getTask: function (id) {
      for (i = 0; i < tasks.length; i++) {
        if (tasks[i].mac === id) {
          return tasks[i]
        }
      }
    }
  }
}
