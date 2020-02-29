import { StorageAccessObject, UrlData } from "./StorageAccessObject";
import { Hash, createHash } from 'crypto';
import { GlobalConfig } from "../config";

/**
 * This class handles all operations for shortening URLs, or getting the original URL.
 * It will the storage via the common interface, instance of which is given in the
 * constructor.
 */
export class UrlShortener {
  
  constructor(private url: string, private storage: StorageAccessObject) {}

  // Create URL hash so to be used as the unique key. Input URL has a variable length and has no limit,
  // but the hash has a fixed length. So, when we index the keys, it will have a predictable size.
  private getUrlHash(): string {
    const hashFunc: Hash = createHash('sha256');
    hashFunc.update(this.url);
    return hashFunc.digest('hex')
  }

  private createShortenedUrl(): string {
    // URL path is created based on the count of the documents, which is converted to number base 16
    // with the prefix added.
    return `${GlobalConfig.PATH_REDIRECT_PREFIX}${this.storage.getCount().toString(16)}`;
  }

  getShortenedUrl(): string {
    const urlHash: string = this.getUrlHash();
    let surl: UrlData | undefined = this.storage.getData(urlHash);
    if (surl === undefined) {
      surl = {
        surl: this.createShortenedUrl(),
        url: this.url,
      };
      this.storage.setData(urlHash, surl);
    }
    return surl.surl;
  }

  getOriginalUrl(): string | undefined {
    const parts: string[] = this.url.split(`/${GlobalConfig.PATH_REDIRECT_PREFIX}`);
    if (parts.length > 0 && !!parts[parts.length - 1]) {
      return this.storage.getUrlBySUrl(`${GlobalConfig.PATH_REDIRECT_PREFIX}${parts[parts.length - 1]}`);
    } else {
      return undefined;
    }
  }
}