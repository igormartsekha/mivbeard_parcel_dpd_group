appServices

/* Parcels service - for retrieving list of parcels, etc. */
.service('Parcels', function ($timeout) {

  var savedParcels = [];

  var Parcels = {
    // dummy retrieving parcel list function
    get: function (callback) {
      $timeout(function () {
        // success callback
        callback({
          success: true,
          parcels: [
            {
              uuid: '1150 1647 576 385 H',
              sender: 'asos.com (221863)',
              date: '01 Mar 2016 11:35',
              status: 'Confirmed at depot',
              statusText: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
              labelScanned: '02 Mar 2016 09:10',
              lastSeen: '02 Mar 2016 12:15 - Oldbury (0030)',
              lastSeenWhere: 'Cage - 26',
              devliveryDue: '03 Mar 2016 11:30',
              report: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
              id: 1
            },
            {
              uuid: '1150 1647 576 386 H', date: '01 Mar 2016 11:36',
              sender: 'asos.com (221864)',
              date: '01 Mar 2016 11:36',
              status: 'Confirmed at depot',
              statusText: 'Delivered, signed for by JONES, on 02 Mar 2016',
              labelScanned: '02 Mar 2016 09:10',
              lastSeen: '02 Mar 2016 12:15 - Oldbury (0030)',
              lastSeenWhere: 'Cage - 26',
              devliveryDue: '03 Mar 2016 11:30',
              id: 2
            },
            { uuid: '1150 1647 576 387 H',
              sender: 'asos.com (221864)',
              date: '01 Mar 2016 11:37',
              status: 'Confirmed at depot',
              statusText: 'Delivered, signed for by JONES, on 02 Mar 2016',
              labelScanned: '02 Mar 2016 09:10',
              lastSeen: '02 Mar 2016 12:15 - Oldbury (0030)',
              lastSeenWhere: 'Cage - 26',
              devliveryDue: '03 Mar 2016 11:30',
              id: 3
            }
          ]
        });
        // error callback
        // callback({ success: false, message: 'Test error message' });
      }, 1000);
    },
    addParcel: function (parcel) {
      savedParcels.push(parcel);
    },
    getSaved: function () {
      return savedParcels;
    },
    save: function (parcels) {
      savedParcels = parcels;
    },
    update: function (uuid, text, observation) {
      for (var i = 0; i < savedParcels.length; i++) {
        if (uuid === savedParcels[i].uuid) {
          savedParcels[i].report = null;
          savedParcels[i].statusText = text;
          savedParcels[i].observation = observation;
        }
      }
    },
    getMockupNewParcel: function() {

      var mockupNewData = [
        {
          uuid: '1150 1647 576 389 H',
          sender: 'asos.com (221863)',
          date: '01 Mar 2016 11:35',
          status: 'Confirmed at depot',
          labelScanned: '02 Mar 2016 09:10',
          lastSeen: '02 Mar 2016 12:15 - Oldbury (0030)',
          lastSeenWhere: 'Cage - 26',
          statusText: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
          report: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
          devliveryDue: '03 Mar 2016 11:30',
          id: 4
        },
        {
          uuid: '1150 1647 576 460 H',
          sender: 'aliexpress.com (12345)',
          date: '03 Mar 2016 11:35',
          status: 'Confirmed at depot',
          labelScanned: '03 Mar 2016 09:10',
          lastSeen: '03 Mar 2016 12:15 - Oldbury (0030)',
          lastSeenWhere: 'Cage - 21',
          statusText: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
          report: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
          devliveryDue: '03 Mar 2016 11:30',
          id: 5
        },
        {
          uuid: '1150 1647 576 999 H',
          sender: 'makaboo.com (543210)',
          date: '05 Mar 2016 11:35',
          status: 'Confirmed at depot',
          labelScanned: '05 Mar 2016 09:10',
          lastSeen: '05 Mar 2016 12:15 - Oldbury (0030)',
          lastSeenWhere: 'Cage - 7',
          statusText: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
          report: 'No Trace (Stolen) reported on 02 Mar 2016 15:30',
          devliveryDue: '05 Mar 2016 11:55',
          id: 6
        }
      ];
      var design = Math.floor(Math.random() * 3);

      var currentVariant = mockupNewData[design];
      var existingParcels = this.getSaved();
      
      var isFound = false;
      for (var i = 0; i < existingParcels.length; i++) {
        if (currentVariant.uuid === existingParcels[i].uuid) {
          currentVariant = existingParcels[i];
          isFound = true;
        }
      }

      if(isFound) {
        return null;
      } else {
        return currentVariant;
      }
    }  
  };

  return Parcels;
});
