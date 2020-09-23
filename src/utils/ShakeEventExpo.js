'use strict';

import { Accelerometer } from 'expo-sensors';

const THRESHOLD = 100;

export class ShakeEventExpo {
  static addListener(handler) {
    let lastX, lastY, lastZ;
    let lastUpdate = 0;

    Accelerometer.addListener((accelerometerData) => {
      let { x, y, z } = accelerometerData;
      let currTime = Date.now();
      if (currTime - lastUpdate > 100) {
        let diffTime = currTime - lastUpdate;
        lastUpdate = currTime;

        let speed =
          (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

        if (speed > THRESHOLD) {
          console.log(currTime + 'lastupdate: ' + lastUpdate);
          console.log(diffTime);
          console.log('sensor', 'shake detected w/ speed: ' + speed);
          handler();
        }
        lastX = x;
        lastY = y;
        lastZ = z;
      }
    });
  }
  static removeListener() {
    Accelerometer.removeAllListeners();
  }
}
