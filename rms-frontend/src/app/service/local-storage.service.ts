import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    public static readonly JWT = 'JWT';

    setItem(key: string, value: any): void {
        try {
            const jsonValue = JSON.stringify(value);
            localStorage.setItem(key, jsonValue);
        } catch (err) {
            console.error('Error storing to local storage', err);
        }
    }

    getItem<T>(key: string): T | null {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (err) {
            console.error('Error reading from local storage', err);
            return null;
        }
    }

    hasItem<T>(key: string): boolean {
        return this.getItem(key) !== null;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}