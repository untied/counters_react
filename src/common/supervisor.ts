import { rxEventBus } from './rxeventbus';

// возможные состояния задачи
enum State {
    UNKNOWN,
    RUNNING,
    SUCCESS,
    STOPPED
}

// задача
class Task {
    // текущее состояние действия
    private __state: State = State.UNKNOWN;

    // хэндлер таймаута
    private __timeout: any = null;

    // конструктор
    public constructor(
        private __position   : number,    // номер кнопки
        private __datetime   : Date,      // дата и время нажатия
        private __supervisor : Supervisor // супервизор
    ) {
    }

    // геттер возвращает номер кнопки
    public get position(): number {
        return this.__position;
    }

    // геттер возвращает дату и время нажатия
    public get datetime(): Date {
        return this.__datetime;
    }

    // геттер возвращает текущее состояние действия
    public get state(): State {
        return this.__state;
    }

    // запуск действия
    public start(): void {
        this.__state   = State.RUNNING;
        this.__timeout = window.setTimeout(() => {
            this.__state = State.SUCCESS;
            this.__supervisor.next(); // уведомить супервайзор
        }, this.__position * 1000);
    }

    // принудительный останов
    public stop(): void {
        window.clearTimeout(this.__timeout);
        this.__timeout = null;
        this.__state   = State.STOPPED;
    }
}

// супервайзор задач
class Supervisor {
    // очередь задач
    private tasks: Task[];

    // конструктор
    public constructor() {
        this.tasks = [];
    }

    // инициализация
    public init(): void {
        rxEventBus.subscribe('button-click', this.onButtonPressed.bind(this));
        rxEventBus.subscribe('reset-click',  this.onResetPressed.bind(this));
    }

    // выполнение следующей задачи из очереди
    public next(): void {
        if (this.tasks.length !== 0) {
            const task: Task = this.tasks[0];
            switch (task.state) {
                case State.UNKNOWN: // запустить следующую задачу на выполнение
                    task.start();
                    break;
                case State.SUCCESS: // удалить готовую задачу и запустить следующую
                    // отправка сообщения в компонент лога
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
                    // nothing
            }
        }
    }

    // callback на нажатие кнопки
    private onButtonPressed(data: any): void {
        this.tasks.push(new Task(data.position, data.datetime, this));
        this.next();
    }

    // callback на нажатие сброса
    private onResetPressed(): void {
        this.tasks.forEach((t: Task): void => {
            t.stop();
        });
        this.tasks = [];
    }
}

export const supervisor: Supervisor = new Supervisor();
