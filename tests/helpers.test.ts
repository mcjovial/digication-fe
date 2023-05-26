import { COLUMN_WIDTH, GUTTER_SIZE } from '../src/constants';
import { localX2ModuleX, localY2ModuleY, moduleHWithGutter, moduleW2LocalWidth, moduleWWithGutter, moduleX2LocalX, moduleY2LocalY, moduleYWithGutter, newPlaceholderHeight, newPlaceholderLeft, newPlaceholderTop, newPlaceholderWidth } from '../src/helpers';

describe('helpers', () => {
  test('moduleW2LocalWidth', () => {
    const w = 2;
    expect(moduleW2LocalWidth(w)).toEqual(w * COLUMN_WIDTH - GUTTER_SIZE);
  });

  test('moduleX2LocalX', () => {
    const X = 40;
    expect(moduleX2LocalX(X)).toEqual(moduleW2LocalWidth(X) + GUTTER_SIZE * 2);
  });

  test('moduleY2LocalY', () => {
    const Y = 30;
    expect(moduleY2LocalY(Y)).toEqual(Y + GUTTER_SIZE);
  });

  test('localX2ModuleX', () => {
    const X = 30;
    expect(localX2ModuleX(X)).toEqual(Math.round((X - GUTTER_SIZE * 2) / COLUMN_WIDTH));
  });

  test('localY2ModuleY', () => {
    const Y = 30;
    expect(localY2ModuleY(Y)).toEqual(Y - GUTTER_SIZE);
  });

  test('newPlaceholderLeft', () => {
    const initialPosition = 30;
    const offset = 20;
    expect(newPlaceholderLeft(initialPosition, offset)).toEqual(initialPosition + Math.round(offset / COLUMN_WIDTH) * COLUMN_WIDTH);
  });

  test('newPlaceholderHeight', () => {
    const initialPosition = 30;
    const offset = 20;
    const height = 20;
    expect(newPlaceholderHeight(initialPosition, offset, height)).toEqual(newPlaceholderTop(initialPosition, offset) + height);
  });

  test('newPlaceholderWidth', () => {
    const initialPosition = 30;
    const offset = 20;
    const width = 20;
    expect(newPlaceholderWidth(initialPosition, offset, width)).toEqual(newPlaceholderLeft(initialPosition, offset) + moduleW2LocalWidth(width));
  });
  
  test('moduleYWithGutter', () => {
    const Y = 30;
    expect(moduleYWithGutter(Y)).toEqual(moduleY2LocalY(Y) - GUTTER_SIZE / 2);
  });

  test('moduleHWithGutter', () => {
    const moduleY = 30;
    const height = 20;
    expect(moduleHWithGutter(moduleY, height)).toEqual(moduleY + height + GUTTER_SIZE * 2);
  });

  test('moduleWWithGutter', () => {
    const moduleX = 30;
    const width = 20;
    expect(moduleWWithGutter(moduleX, width)).toEqual(moduleX2LocalX(moduleX) + moduleW2LocalWidth(width));
  });
});
