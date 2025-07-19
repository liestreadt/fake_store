import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { MainPage } from './MainPage';

const sum = (a: number, b: number) => a + b;

test('Get sum of 2 number', () => {
    expect(sum(3, 4)).toBe(7);
});

describe('MainPage', () => {
    test('renders MainPage', () => {
        render(<MainPage />);
    });
});
