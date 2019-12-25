import { Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// интерфейс отписки от событий
export interface RxSubscription {
    unsubscribe(): void;
}

// класс 'Событие'
export class RxEvent {
    private _key: string|null = null;
    private _val: any         = null;

    // конструктор
    constructor(key : string, val? : any) {
        this._key = key;
        this._val = val ? val : null;
    }

    // геттер свойства 'key'
    public get key(): string|null {
        return this._key;
    }

    // сеттер свойства 'key'
    public set key(_key: string|null) {
        this._key = _key;
    }

    // геттер свойства 'val'
    public get val(): any {
        return this._val;
    }

    // сеттер свойства 'val'
    public set val(_val: any) {
        this._val = _val
    }
}

// класс 'Шина событий'
export class RxEventBus {
    private subject = new Subject<RxEvent>();

    // подписка
    public subscribe(key: string, action: any): RxSubscription {
        return this.subject
            .pipe(
                filter((event: RxEvent) => event.key === key),
                map((event: RxEvent) => event.val)
            )
            .subscribe(action);
    }

    // публикация события
    public publish(key: string, value?: any): void {
        this.subject.next(new RxEvent(key, value));
    }
}

// экспорт экземпляра класса
export const rxEventBus = new RxEventBus();
