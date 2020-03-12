# A simple test project built in React framework

![Project Screenshot](https://raw.githubusercontent.com/untied/counters_react/master/public/screenshot.png)

Three counter buttons are represented on the screen. You may click buttons randomly. Each click generates a task. The **green button** generates the tasks that last 1 second. The **yellow button** generates the tasks that last 2 seconds. And the **red button** generates the tasks that last 3 seconds. All tasks are executed __strictly in the order__ the buttons were pressed. When the task is finished a new log record is added to the event list.

The project demonstrates these front-end development advantages:

* React functional approach
* Benefits of TypeScript
* Communication between components with event bus
* Usage of RxJS
* Usage of storages and contexts

If you want to try &mdash; just clone it and then:

```
~/$ cd counters_react

~/counters_react/$ npm install

~/counters_react/$ npm start
```
