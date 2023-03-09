/**
 * @file utils TGMap
 * @description TGMap 的具体实现
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha
 */

import { Map } from "../interface/Base";

/**
 * @description TGMap 的具体实现
 * @since Alpha
 * @class TGMap
 * @template T
 * @see Map
 * @return TGMap
 */
class TGMap<T> {
	/**
	 * @description TGMap 的实例化数据
	 * @see Map
	 * @description 使用 protected 修饰符，防止外部直接修改
	 * @since Alpha
	 * @return Map<T>
	 */
	protected map: Map<T>;

	/**
	 * @description TGMap 的构造函数
	 * @since Alpha
	 * @param {Map<T>} map - 传入的 Map<T>
	 * @description 可选参数
	 * @return TGMap
	 */
	constructor(map: Map<T> = {}) {
		this.map = map;
	}

	/**
	 * @description 返回 TGMap 的实例化数据
	 * @since Alpha
	 * @return Map<T>
	 */
	getMap(): Map<T> {
		return this.map;
	}

	/**
	 * @description Map<T> 的 keys 方法
	 * @since Alpha
	 * @return string[]
	 */
	keys(): string[] {
		return Object.keys(this.map);
	}

	/**
	 * @description Map<T> 的 values 方法
	 * @since Alpha
	 * @return ArrayLike<T>
	 */
	values(): ArrayLike<T> {
		return Object.values(this.map);
	}

	/**
	 * @description Map<T> 的 forEach 方法
	 * @since Alpha
	 * @param {(value: T, key: string, map: Map<T>) => void} callback - 回调函数
	 * @return void
	 */
	forEach(callback: (value: T, key: string, map: Map<T>) => void): void {
		Object.keys(this.map).forEach(key => {
			callback(this.map[key], key, this.map);
		});
	}

	/**
	 * @description Map<T> 的 get 方法
	 * @since Alpha
	 * @param {string} key - 键
	 * @return T
	 */
	get(key: string): T {
		return this.map[key];
	}

	/**
	 * @description Map<T> 的 set 方法
	 * @since Alpha
	 * @param {string} key - 键
	 * @param {T} value - 值
	 * @return void
	 */
	set(key: string, value: T): void {
		this.map[key] = value;
	}

	/**
	 * @description Map<T> 的 delete 方法
	 * @since Alpha
	 * @param {string} key - 键
	 * @return void
	 */
	delete(key: string): void {
		delete this.map[key];
	}

	/**
	 * @description Map<T> 的 clear 方法
	 * @since Alpha
	 * @return void
	 */
	clear(): void {
		Object.keys(this.map).forEach(key => {
			delete this.map[key];
		});
	}

	/**
	 * @description Map<T> 的 has 方法
	 * @since Alpha
	 * @param {string} key - 键
	 * @return boolean
	 */
	has(key: string): boolean {
		return this.map.hasOwnProperty(key);
	}

	/**
	 * @description Map<T> 的 size 方法
	 * @since Alpha
	 * @return number
	 */
	size(): number {
		return Object.keys(this.map).length;
	}

	/**
	 * @description Map<T> 的 isEmpty 方法
	 * @since Alpha
	 * @return boolean
	 */
	isEmpty(): boolean {
		return Object.keys(this.map).length === 0;
	}

	/**
	 * @description Map<T> 的 sort 方法
	 * @since Alpha
	 * @param {(a: T, b: T) => number} callback - 回调函数
	 * @return TGMap<T>
	 */
	sort(callback: (a: T, b: T) => number): TGMap<T> {
		const keys: string[] = Object.keys(this.map);
		const values: T[] = Object.values(this.map);
		const sortedValues: T[] = values.sort(callback);
		const sortedMap: Map<T> = {};
		keys.forEach((key, index) => {
			sortedMap[key] = sortedValues[index];
		});
		return new TGMap(sortedMap);
	}
}

export default TGMap;
