export class Util {
  static prependHttp(url: string): string {
    if (url.startsWith('/')) {
      return `http://${window.location.host}${url}`;
    }
    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      return `http://${url}`;
    }
    return url;
  }
}