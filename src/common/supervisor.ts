import { rxEventBus } from './rxeventbus';

// enum of possible task state
enum State {
    UNKNOWN,
    RUNNING,
    SUCCESS,
    STOPPED
}

// class to represent a single task
class Task {
    // current task state
    private __state: State = State.UNKNOWN;

    // timeout handler
    private __timeout: any = null;

    // just the constructor
    public constructor(
        private __position   : number,    // button number
        private __datetime   : Date,      // click date and time
        private __supervisor : Supervisor // task supervisor
    ) {
    }

    // button number getter
    public get position(): number {
        return this.__position;
    }

    // click date and time getter
    public get datetime(): Date {
        return this.__datetime;
    }

    // current task state getter
    public get state(): State {
        return this.__state;
    }

    // start the task execution
    public start(): void {
        this.__state   = State.RUNNING;
        this.__timeout = window.setTimeout(() => {
            this.__state = State.SUCCESS;
            this.__supervisor.next(); // notify the supervisor
        }, this.__position * 1000);
    }

    // stop the task immediatelly
    public stop(): void {
        window.clearTimeout(this.__timeout);
        this.__timeout = null;
        this.__state   = State.STOPPED;
    }
}

// task supervisor
class Supervisor {
    // task queue
    private tasks: Task[];

    // just the constructor
    public constructor() {
        this.tasks = [];
    }

    // initialization
    public init(): void {
        rxEventBus.subscribe('button-click', this.onButtonPressed.bind(this));
        rxEventBus.subscribe('reset-click',  this.onResetPressed.bind(this));
    }

    // get the next task from queue and execute it
    public next(): void {
        if (this.tasks.length !== 0) {
            const task: Task = this.tasks[0];
            switch (task.state) {
                case State.UNKNOWN: // start the next task
                    task.start();
                    break;
                case State.SUCCESS: // remove the ready task and start the next one
                    // send the message to log
                    rxEventBus.publish('log-entry', {
                        position  : task.position,
                        clickTime : task.datetime,
                        logTime   : new Date()
                    });
                    this.tasks.shift();
                    if (this.tasks.length !== 0 && this.tasks[0].state === State.UNKNOWN) {
                        this.tasks[0].start();
                    }
                    break;
                default:
                    // Nothing!
            }
        }
    }

    // button click callback
    private onButtonPressed(data: any): void {
        this.tasks.push(new Task(data.position, data.datetime, this));
        this.next();
    }

    // reset click callback
    private onResetPressed(): void {
        this.tasks.forEach((t: Task): void => {
            t.stop();
        });
        this.tasks = [];
    }
}

// export the supervisor instance
export const supervisor: Supervisor = new Supervisor();
