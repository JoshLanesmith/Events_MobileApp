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
      console.log("getCurrentLocation()")
      const options = {
        timeout: 1000,
        maximumAge: 0,
        enableHighAccuracy: true
      }

      navigator.geolocation.getCurrentPosition((data) => {
        resolve({
          lat: data.coords.latitude,
          lng: data.coords.longitude,
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

      console.log("getLocationByAddress()")
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

  getRoute(routingMode: string, transportMode: string, origin: any, destination: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const router = this.hMapPlatform.getRoutingService(null, 8);
      console.log("getRoute()")

      const routingParameters = {
        'routingMode': routingMode,
        'transportMode': transportMode,
        // The start point of the route:
        'origin': `${origin.lat},${origin.lng}`,
        // The end point of the route:
        'destination': `${destination.lat},${destination.lng}`,
        // Include the route shape in the response
        'return': 'summary',
      };

      router.calculateRoute(
        routingParameters,
        (data: any) => {
          if (data.routes.length){
            resolve(data.routes);
          }
          else {
            reject('Can\'t calculate route')
          }
        },
        (err: any) => {
          reject('Can\'t calculate route')
        }
      );
    })
  }
}
