interface IQueue<T> {
    enqueue(_item: T): void;
    dequeue(): T | undefined;
    size(): number;
}

const capacityError = 'Queue has reached max capacity, you cannot add more items';

class Queue<T> implements IQueue<T> {
    private storage: T[] = [];
    private capacity: number;

    constructor() {
        this.capacity = 10;
    }

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error(capacityError);
        }
        this.storage.push(item);
    }
    dequeue(): T | undefined {
        return this.storage.shift();
    }
    size(): number {
        return this.storage.length;
    }
}

import { expect, test, describe } from 'vitest';

describe('Queue test', () => {
    test('test of enqueue methods', () => {
        const queue = new Queue<string>();

        queue.enqueue('A');
        queue.enqueue('B');

        expect(queue.size()).toBe(2);
        expect(queue.enqueue('C'));
        expect(queue.size()).toBe(3);
    });

    test('test of dequeue methods', () => {
        const queue = new Queue<string>();

        queue.enqueue('A');
        queue.enqueue('B');

        expect(queue.size()).toBe(2);
        expect(queue.dequeue()).toBe('A');
        expect(queue.dequeue()).toBe('B');
        expect(queue.size()).toBe(0);
    });

    test('test of capacity', () => {
        const queue = new Queue<string>();

        for (let i = 0; i < 9; i++) {
            queue.enqueue(`elem_${i}`);
        }

        expect(queue.size()).toBe(9);

        try {
            queue.enqueue('elem_10');
            queue.enqueue('elem_11');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            if (error instanceof Error) {
                expect(error.stack).toContain(capacityError);
            }
        }
    });
});
