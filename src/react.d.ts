function createRef<T>(): RefObject<T>;
interface RefObject<T> {
  readonly current: T | null | undefined;
}