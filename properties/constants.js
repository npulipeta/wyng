
exports.responseMessages = {
    PARAMETER_MISSING       : "PARAMETER_MISSING",
    LOCK_MANUALLY           : "LOCK_MANUALLY",
    SOMETHING_WENT_WRONG    : "SOMETHING_WENT_WRONG",
    SUCCESS                 : "SUCCESS",
    SHOW_ERROR_MESSAGE      : "SHOW_ERROR_MESSAGE",
    ERROR_IN_EXECUTION      : "ERROR_IN_EXECUTION",
    ASSET_ID_ALREADY_EXISTS : "ASSET_ID_ALREADY_EXISTS",
    DEVICE_ID_ALREADY_EXISTS: "DEVICE_ID_ALREADY_EXISTS",
    QR_CODE_ALREADY_EXISTS  : "QR_CODE_ALREADY_EXISTS",
    DEVICE_TYPE_NOT_EXIST   : "DEVICE_TYPE_NOT_EXIST",
    TRACKER_ID_NOT_EXIST    : "TRACKER_ID_NOT_EXIST",
    DEVICE_TYPE_INACTIVE    : "DEVICE_TYPE_INACTIVE",
    DEVICE_ID_NOT_EXIST     : "DEVICE_ID_NOT_EXIST",
    ASSET_ID_NOT_EXIST      : "ASSET_ID_NOT_EXIST",
    BUSINESS_INACTIVE       : "BUSINESS_INACTIVE",
    JOB_ALREADY_EXISTS      : "JOB_ALREADY_EXIST",
    JOB_ASSIGNED            : "JOB_ASSIGNED_SUCCESSFUL",
    JOB_ACTION_COMPLETED    : "JOB_ACTION_COMPLETED",
    JOB_FAILED              : "JOB_ALREADY_FAILED",
    INVALID_ACTION          : "INVALID_ACTION",
    LOCK_ALREADY_IN_REQUESTED_STATE : "LOCK_ALREADY_IN_REQUESTED_STATE",
    KEY_ERROR               : "KEY_ERROR"
};

exports.responseFlags = {
  SUCCESS              : 200,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST          : 400,
  CLIENT_ERROR         : 401,
  SHOW_ERROR_MESSAGE   : 201,
  ERROR_IN_EXECUTION   : 404
};

exports.businessId = {
  TOOKAN               : 1,
  YELO                 : 2,
  JUGNOO               : 3
};

exports.droneJobType = {
  PICKUP  : 0,
  DELIVERY: 1
};

exports.dronePacketType = {
    JOB_WEBHOOK   : 0,
    JOB_STATUS    : 1,
    JOB_TIDA_PANEL: 2
};

exports.droneJobStatusAckType = {
    SUCCESS   : 1,
    FAILED    : 0
};

exports.tookanDevices = {
    SINO_BIKE   :   7,
    SINO_CAR    :   9,
    WATCH       :   1
};

exports.jugnooDevices = {
    BIKE_LOCK   :   3,
    HOP_ON      :   5
};

exports.yeloDevices = {
    WATCH       :   1
};

exports.deviceTypes = {
  WATCH         : 1,
  ITRACK_H02    : 2,
  BL10_GPS_LOCK : 3,
  DRONE         : 4,
  HOPON         : 5,
  OMNI_SCOOTER  : 6,
  SINO_BIKE     : 7,
  TOPTEN        : 8,
  SINO_CAR      : 9
};

exports.gpslockJobStatus = {
  ALREADY_EXISTED : 0,
  ACTION_COMPLETED : 1,
  ACTION_FAILED : 3,
  NEW_JOB : 4
}

exports.hopOnResults = {
  SUCCESS : 0,
  FAIL : 1,
  PARAMETERS_ABNORMAL : 2,
  PARAMETERS_QR_CODE_NOT_CORRECT : 3,
  DEVICE_NOT_AVAILABLE : 4,
  GPS_SERVER_ABNORMAL : 5,
  EXCEPTION_OCCURRED_ON_SERVER :6
}

exports.hopOnScooter = {
  unlock : "/useropenLock",
  lock   : "/usercloseLock",
  openHeadlights  : "/useropenLight",
  closeHeadlights : "/usercloseLight",
  openRearlights  : "/useropenBackLight",
  closeRearlights : "/usercloseBackLight",
  liveData        : "/usergetDeviceLiveData",
  latestFaultData : "/usergetLiveBokenData",
  deviceData      : "/usergetDeviceData",
  activelyFaultInformation : "/usersendBokensGetData",
  activelyRealTimeData     : "/usersendLiveGetData",
  activelyEquipmentData    : "/usersendDeviceGetData",
  homeCarType        : "/usergetHomeCarType",
  homePageVehicle    : "/usergetHomeCars",
  returnPoint        : "/usergetgiveBackCarPoint",
  deviceLocation     : "/usergetGpsWhereByImei",
  deviceRunningTrack : "/usergetGpsLocus",
  commandData        : "/usersendDeviceGpsData",
  vehicleDetails     : "/usergetCarData"
};

exports.omniScooterProtocols = {
  signingIn                     : "Q0",
  heartbeat                     : "H0",
  unlockingLockingRequest       : "R0",
  unlockingCommand              : "L0",
  lockingCommand                : "L1",
  iotDeviceSetting              : "S5",
  gettingScooterInformation     : "S6",
  scooterSetting1               : "S7",
  scooterSetting2               : "S4",
  alarm                         : "W0",
  beepPlayback                  : "V0",
  gettingPositioningInstruction : "D0",
  positioningTracking           : "D1",
  gettingFirmware               : "G0",
  uploadingControllerFault      : "E0",
  detectStartUpgrade            : "U0",
  getUpgradeData                : "U1",
  notificationOfUploading       : "U2",
  settingOrGetBLE8Key           : "K0",
  eventNotification             : "S1",
}

exports.omniScooter = {
  manufacturer            : "OM",
  keyEffectiveTime        : 20
}

exports.omiScooterResponse = {
  success : 0,
  failure : 1,
  keyError :2
}

exports.gpslockActions = {
    LOCK                    : 0,
    UNLOCK                  : 1,
    REQ_START_RIDE_UNLOCK   : 2,
    START_RIDE_UNLOCK       : 3,
    REQ_IN_RIDE_LOCK        : 4,
    IN_RIDE_LOCK            : 5,
    REQ_IN_RIDE_UNLOCK      : 6,
    IN_RIDE_UNLOCK          : 7,
    REQ_END_RIDE_LOCK       : 8,
    END_RIDE_LOCK           : 9
};

exports.gpslockStatus = {
  unlock   : "a1",
  lock : "a0"
}

exports.bl10Commands = {
    "#": "23",
    ",": "2c",
    "unlock#": "756E6C6F636B23",
    "ljdw#": "4c4a445723",
    "gtimer": "4754494d4552",
    "gpsoff#": "4750534f464623",
    "gpson" : "4750534f4e",
    "ok!"   : "4f4b21"
};

exports.locationPacketStatus = {
    DEFAULT                 : 0,
    SEND_TO_TOOKAN          : 1,
    POSITION_OR_SATELLITE   : 2,
    NEGATIVE_TIME           : 3,
    RANDOM_LOCATION         : 4,
    QUEUE_VALIDATION        : 5,
    SEND_QUEUE_TO_TOOKAN    : 6
};

exports.deviceSpeedLimit = {
    WATCH         : 140,
    ITRACK_H02    : 140,
    BL10_GPS_LOCK : 140,
    DRONE         : 300,
    HOPON         : 140,
    OMNI_SCOOTER  : 140,
    SINO_BIKE     : 140,
    TOPTEN        : 140,
    SINO_CAR      : 140
};

exports.deviceLocationFreq = {
    WATCH         : 10,
    ITRACK_H02    : 10,
    BL10_GPS_LOCK : 180,
    DRONE         : 5,
    HOPON         : 10,
    OMNI_SCOOTER  : 10,
    SINO_BIKE     : 10,
    TOPTEN        : 10,
    SINO_CAR      : 10
};

exports.tookanTaskStatus = {
    ASSIGNED    :   0,
    STARTED     :   1,
    SUCCESSFUL  :   2,
    FAILED      :   3,
    INPROGRESS  :   4,
    UNASSIGNED  :   5,
    ACCEPTED    :   6,
    DECLINED    :   7,
    DECLINE     :   8,
    CANCEL      :   9,
    DELETED     :   10
};

exports.taskArrivedDistLimit = {
    SINO_BIKE     : 100,
};

exports.batteryLimits = {
    BL10_GPS_LOCK : 20
};

exports.droneCommands = {  
  WAYPOINT : 1,
  TAKEOFF : 2, 
  SPLAY_WAYPOINT : 3,
  LOITER_TIME : 4,
  LOITER_TURNS : 5, 
  LOITER_UNLIMITED : 6, 
  RETURN_TO_LAUNCH : 7, 
  LAND : 8, 
  DELAY : 9, 
  DO_SET_ROI : 10,
  CONDITION_DELAY : 11,
  CONDITION_DISTANCE : 12,
  CONDITION_YAW : 13,
  DO_JUMP : 14,
  DO_CHANGE_SPEED : 15,
  DO_SET_HOME : 16,
  DO_SET_CAMM_TRIGG_DIST : 17,
  DO_SET_RELAY : 18,
  DO_REPEAT_RELAY : 19,
  DO_SET_SERVO : 20,
  DO_REPEAT_SERVO : 21,
  DO_DIGICAM_CONTROL : 22,
  DO_MOUNT_CONTROL : 23,
  DO_GRIPPER : 24
};

exports.droneCommandparams = {
    delay       :   "Delay",
    altitude    :   "Altitude",
    hit_radius  :   "Hit Radius",
    yaw_angle   :   "Yaw Angle",
    turn        :   "Turn",
    dir         :   "Direction",
    distance    :   "Distance",
    deg         :   "Deg",
    rel         :   "Rel",
    repeat_check:   "Repeat Check",
    speed       :   "Speed",
    current_spec:   "Current Spec",
    relay       :   "Relay",
    on_off      :   "On / Off",
    servo_no    :   "Servo Number",
    pvm         :   "PVM"
};
