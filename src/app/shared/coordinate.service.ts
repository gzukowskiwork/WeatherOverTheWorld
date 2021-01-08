export class CoordinateService {
  reverseCoordinatesToLatLon(coordinateString: string): {longitude: string, latitude: string}{
    if (coordinateString === undefined){
      return {longitude: '', latitude: ''};
    }else {
      const coordinatesWithoutSpace = coordinateString.replace(/\s+/g, '');
      const array = coordinatesWithoutSpace.split(',');
      array.reverse();
      return {
        longitude: array[0],
        latitude: array[1]
      };
    }
  }
}
