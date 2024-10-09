export interface PlantStatus {
  id: number;
  name: string;
  soilMoisture: number;
  lastWatered: string;
  nutrientLevel: string;
  status: string;
}

export interface MockData {
  plantStatus: PlantStatus[];
  nutrientStatus: {
    pH: number;
    ec: number;
    status: string;
  };
  environment: {
    temperature: number;
    humidity: number;
    rainProbability: number;
    windSpeed: number;
  };
  systemHealth: {
    batteryLevel: number;
    pumpStatus: string;
    lastMaintenance: string;
    status: string;
  };
  alerts: {
    id: number;
    message: string;
    severity: string;
  }[];
  logs: {
    timestamp: string;
    action: string;
    plantId: number;
    details: string;
  }[];
}
