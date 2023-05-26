import { COLUMN_WIDTH, GUTTER_SIZE } from './constants';

export const moduleW2LocalWidth = (moduleW: number) => moduleW * COLUMN_WIDTH - GUTTER_SIZE;
export const moduleX2LocalX = (moduleX: number) => moduleW2LocalWidth(moduleX) + GUTTER_SIZE * 2;
export const moduleY2LocalY = (moduleY: number) => moduleY + GUTTER_SIZE;

/**
 * Converts X-coordinate of a module's placeholder in pixels to an approximate number of columns.
 * @param {number} localX - The placeholder left position.
 * @returns {number} The module X position.
 */
export const localX2ModuleX = (localX: number): number => {
  return Math.round((localX - GUTTER_SIZE * 2) / COLUMN_WIDTH);
};
