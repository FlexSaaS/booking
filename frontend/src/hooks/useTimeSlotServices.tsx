import { useMemo } from "react";
// import { FirebaseTimeSlotServiceProvider } from "../services/database/FirebaseTimeSlotServiceProvider";
// import { firebaseConfig } from "../services/database/config/firebaseConfig";
// import { TimeSlotService } from "../services/database/TimeSlotService";

export const useTimeSlotService = () => {
  return useMemo(() => {
    // const provider = new FirebaseTimeSlotServiceProvider(firebaseConfig);
    // return new TimeSlotService(provider);
  }, []);
};
