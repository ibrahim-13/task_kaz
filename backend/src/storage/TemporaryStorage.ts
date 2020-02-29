import { StorageAccessObject, UrlData } from "./StorageAccessObject";

/**
 * This is a dummy storage device that stores data in the memory.
 */
export class TemporaryStorage implements StorageAccessObject {
  private static defaultInstance: TemporaryStorage;

  private currentStorage: {[key: string]: UrlData} = {};

  private constructor() {}

  public static Instance(): TemporaryStorage {
    if (!TemporaryStorage.defaultInstance) {
      TemporaryStorage.defaultInstance = new TemporaryStorage();
    }
    return TemporaryStorage.defaultInstance;
  }

  getData(key: string): UrlData | undefined {
    return this.currentStorage[key];
  }

  setData(key: string, data: UrlData): void {
    this.currentStorage[key] = data;
  }

  getUrlBySUrl(surl: string): string | undefined {
    const matched = Object.keys(this.currentStorage)
      .filter(key => this.currentStorage[key].surl === surl);
    
    if (matched.length > 0) {
      return this.currentStorage[matched[0]].url;
    } else {
      return undefined;
    }
  }

  getCount(): number {
    return Object.keys(this.currentStorage).length;
  }
}