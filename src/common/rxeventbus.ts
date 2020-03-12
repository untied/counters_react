import { Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// event subscription interface
export interface RxSubscription {
    unsubscribe(): void;
}

// class to represent a single event
export class RxEvent {
    private __key: string|null = null;
    private __val: any         = null;

    // just the constructor
    constructor(key : string, val? : any) {
        this.__key = key;
        this.__val = val ? val : null;
    }

    // key property getter
    public get key(): string|null {
        return this.__key;
    }

    // key property setter
    public set key(__key: string | null) {
        this.__key = __key;
    }

    // value property getter
    public get val(): any {
        return this.__val;
    }

    // value property setter
    public set val(__val: any) {
        this.__val = __val
    }
}

// class to represent an event bus
export class RxEventBus {
    private subject = new Subject<RxEvent>();

    // subscribe on events method
    public subscribe(key: string, action: any): RxSubscription {
        return this.subject
            .pipe(
                filter((event: RxEvent) => event.key === key),
                map((event: RxEvent) => event.val)
            )
            .subscribe(action);
    }

    // publish an event method
    public publish(key: string, value?: any): void {
        this.subject.next(new RxEvent(key, value));
    }
}

// export the event bus instance
export const rxEventBus = new RxEventBus();
