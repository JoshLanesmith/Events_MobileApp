import { Injectable } from '@angular/core';

declare const H: any;

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  hMapPlatform = new H.service.Platform({
    'apikey': 'tEFQY8TgkjoQl1kDNuaWu6fV4BlcibtMLQvoqKak92A'
  });

  constructor() { }

  getCurrentLocation(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const options = {
        timeout: 1000,
        maximumAge: 0,
        enableHighAccuracy: true
      }

      navigator.geolocation.getCurrentPosition((data) => {
        resolve({
          lat: data.coords.latitude,
          lon: data.coords.longitude,
        });
      }, (err) => {
        reject({
          code: err.code,
          message: err.message
        })

      }, options);
    })
  }

  getLocationByAddress(address: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let geocoder = this.hMapPlatform.getSearchService()
      const options = {
        q: `${address}`
      }

      geocoder.geocode(
        options,
        (data: any) => {
          resolve(data.items);
        },
        (err: any) => {
          reject('Can\'t reach the remote server to get location');
        }
      );

    })
  }
}
