import { COLUMN_WIDTH, CONTAINER_WIDTH, GUTTER_SIZE } from './constants';
import PlaceholderInterface from './types/PlaceholderInterface';

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

/**
 * Converts placeholder's top position to module Y position.
 * @param {number} localY - The rectangle top position.
 * @returns {number} The module Y position.
 */
export const localY2ModuleY = (localY: number): number => {
  return localY - GUTTER_SIZE;
};

/**
 * Determines if a placeholder is out of bounds.
 * @param {PlaceholderInterface} placeholder - The placeholder to check.
 * @param {number} containerHeight - The container height.
 * @returns {boolean} True if the placeholder is out of bounds, false otherwise.
 */
export const isOutOfBounds = (placeholder: PlaceholderInterface, containerHeight: number): boolean => {
  const { top, left, height, width } = placeholder;
  if (top < 0 || left < 0 || height > containerHeight || width > CONTAINER_WIDTH) {
    return true;
  }
  return false;
};

/**
 * Calculates the new top position of a placeholder.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @returns {number} The top position of a placeholder.
 */
export const newPlaceholderTop = (initialPosition: number, offset: number): number => {
  let val = initialPosition + Math.round(offset / GUTTER_SIZE) * GUTTER_SIZE;
  console.log('val', val);
  if (val < 0) val = GUTTER_SIZE;
  return val;
};

/**
 * Calculates the new left position of a placeholder.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @returns {number} The left position of a placeholder.
 */
export const newPlaceholderLeft = (initialPosition: number, offset: number): number => {
  return initialPosition + Math.round(offset / COLUMN_WIDTH) * COLUMN_WIDTH;
};

/**
 * Calculates the height of a rectangle.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @param {number} height - The height.
 * @returns {number} The height of a rectangle.
 */
export const newPlaceholderHeight = (initialPosition: number, offset: number, height: number): number => {
  return newPlaceholderTop(initialPosition, offset) + height;
};

/**
 * Calculates the width of a rectangle.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @param {number} width - The width.
 * @returns {number} The width of a rectangle.
 */
export const newPlaceholderWidth = (initialPosition: number, offset: number, width: number): number => {
  return newPlaceholderLeft(initialPosition, offset) + moduleW2LocalWidth(width);
};
