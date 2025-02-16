import { defineStore } from 'pinia'
import { getOptimizedRouteData, getNewOptimizedRoute } from '@/utils/optimizeRouteHelper';

export const useRouteStore = defineStore('route', {
  state: () => ({
    selectedRouteList: [], // list of sensor objects part of the route
    isRouteGenerated: false, // when google api has been run on the route and we want to present it
    startPointAddress: '6900 Airport Rd Mississauga ON',
    endPointAddress: '6135 Airport Rd Mississauga ON',
    routeDuration: '',
    routeDistance: '',
    hasMappedStartEnd: false
  }),
  getters: {
    getSelectedRouteList({selectedRouteList}) {
      return selectedRouteList;
    },
    getSelectedRouteLatLong({selectedRouteList}) {
      if (selectedRouteList.length > 0) {
        return selectedRouteList.map(sensor => [sensor.lat, sensor.long]);
      }
      return [];
    },
    getIsRouteGenerated({isRouteGenerated}) {
      return isRouteGenerated;
    },
    getStartPointAddress({startPointAddress}) {
      return startPointAddress;
    },
    getEndPointAddress({endPointAddress}) {
      return endPointAddress;
    },
    getRouteDuration({routeDuration}) {
      return routeDuration;
    },
    getRouteDistance({routeDistance}) {
      return routeDistance;
    },
    getHasMappedStartEnd({hasMappedStartEnd}) {
      return hasMappedStartEnd;
    },
  },
  actions: {
    setStartPoint(value) {
      this.startPointAddress = value;
    },
    setHasMappedStartEnd(value) {
      this.hasMappedStartEnd = value;
    },
    setEndPoint(value) {
      this.endPointAddress = value;
    },
    setRouteDuration(value) {
      this.routeDuration = value;
    },
    setRouteDistance(value) {
      this.routeDistance = value;
    },
    setSelectedRouteList(value) {
      this.selectedRouteList = value;
    },
    updateRouteListWithSensors(sensors) {
      this.selectedRouteList = [...sensors];
    },
    addSensorToRoute(sensor) {
      this.selectedRouteList.push(sensor);
    },
    removeSensorFromRoute(sensor) {
      const index = this.selectedRouteList.indexOf(sensor);
      if (index > -1) {
        this.selectedRouteList.splice(index, 1);
      }
    },
    clearSensorRoute() {
      this.selectedRouteList = [];
      this.isRouteGenerated = false;
    },
    setIsRouteGenerated(value) {
      this.isRouteGenerated = value;
    },
    isAlreadyInRoute(sensor) {
      if (this.getSelectedRouteList.length > 0) {
        return !!this.getSelectedRouteList.find(bin => bin.id === sensor.id);
      }
      return false
    },
    async googUpdateRouteStats() {
      const googResponse = await getOptimizedRouteData(this.getSelectedRouteList, this.startPointAddress, this.endPointAddress, false);
      if (googResponse && googResponse.routes && googResponse.routes[0]) {
        if (googResponse.routes[0].duration) {
          this.setRouteDuration(googResponse.routes[0]?.duration);
        }

        if (googResponse.routes[0].distanceMeters) {
          this.setRouteDistance(googResponse.routes[0]?.distanceMeters);
        }
        this.setIsRouteGenerated(true);
      }
    },
    async googOptimizeRoute() { // updates our stored selected route state with new optimized route
      const googResponse = await getOptimizedRouteData(this.getSelectedRouteList, this.startPointAddress, this.endPointAddress);
      if (googResponse && googResponse.routes && googResponse.routes[0]) {
        const newRouteIndexOrder = googResponse.routes[0].optimizedIntermediateWaypointIndex; // [0,3,4]
        const optimizedRoute = getNewOptimizedRoute(this.selectedRouteList, newRouteIndexOrder);
        this.setSelectedRouteList(optimizedRoute); // update our route

        if (googResponse.routes[0].duration) {
          this.setRouteDuration(googResponse.routes[0]?.duration);
        }

        if (googResponse.routes[0].distanceMeters) {
          this.setRouteDistance(googResponse.routes[0]?.distanceMeters);
        }
        this.setIsRouteGenerated(true);
      }
    }
  },
})