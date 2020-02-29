export interface UrlData {
  url: string;
  surl: string
}

/**
 * @interface StorageAccessObject Communicate to the data storage device
 * @description This interface acts as the medium to communicate with storage devices (ex. database). \
 * By implementing this, we can define multiple storage and swap them when needed.
 */
export interface StorageAccessObject {
  /**
   * @function getData() Get data from storage
   * @param key Unique key which will be used to access data
   * @returns {UrlData | undefined}
   */
  getData(key: string): UrlData | undefined;

  /**
   * @function getUrlBySUrl() Get original URL from the Shortened URL
   * @param surl Shortened URL
   * @returns {string | undefined}
   */
  getUrlBySUrl(surl: string): string | undefined;

  /**
   * @function setData() Store data for the given key
   * @param key Unique key for the data
   * @param data URL data
   * @returns {void}
   */
  setData(key: string, data: UrlData): void;

  /**
   * @function getCount() Get number of data stored
   * @returns {number}
   */
  getCount(): number;
}