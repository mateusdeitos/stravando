export class CacheInMemory {
	private expirationControl = new Map<string, number>();
	private cache = new Map<string, any>();
	static instance: CacheInMemory;

	private constructor() {}

	public get<T>(key: string): T | undefined {
		const now = Date.now();
		const expiration = this.expirationControl.get(key);

		if (expiration && now > expiration) {
			this.cache.delete(key);
			this.expirationControl.delete(key);
			return undefined;
		}

		return this.cache.get(key);
	}

	public set<T>(key: string, value: T, ttl = 1000 * 60 * 60): void {
		this.cache.set(key, value);
		this.expirationControl.set(key, Date.now() + ttl);
	}

	public delete(key: string): void {
		this.cache.delete(key);
	}

	public static getInstance(): CacheInMemory {
		if (!CacheInMemory.instance) {
			CacheInMemory.instance = new CacheInMemory();
		}

		return CacheInMemory.instance;
	}
}
