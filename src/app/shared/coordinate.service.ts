export class CoordinateService {
  reverseCoordinatesToLatLon(coordinateString: string): string[]{
    if (coordinateString === undefined){
      coordinateString = '';
      return coordinateString.split('');
    }else {
      const coordinatesWithoutSpace = coordinateString.replace(/\s+/g, '');
      const array = coordinatesWithoutSpace.split(',');
      return array.reverse();
    }
  }
}
