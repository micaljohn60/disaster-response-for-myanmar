"use client";
import ActivityBar from "@/components/activity_bar/activity_bar";
import AddInfoPopUp from "@/components/popup/Add_Info_Popup";
import RightSideBar from "@/components/side_bar/right_side_bar/right_side_bar";
import apiService from "@/services/apiService";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OSMMap = dynamic(() => import("@/components/OSMMap"), { ssr: false });

export default function Page() {
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [locateState, setLocateState] = useState<number[]>([19.7667, 96.0315]);

  const handleLocateEvent = (newState: number[]) => {
    setLocateState(newState);
  };

  const fetchingMissingPerson = async () => {
    try {
      setLoading(true);
      const data: MissingPerson[] = await apiService.getAllMissingPerson();
      setMissingPersons(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingMissingPerson();
  }, []);

  if (loading) {
    return <div> Loading Data </div>;
  }

  if (error) {
    return <div>Error : {error}</div>;
  }

  return (
    <div className="bg-primary">
      <div className="grid lg:grid-cols-4 gap-4 sm:grid-cols-1">
        <div className="col-span-3">
          <OSMMap missingPersons={missingPersons} flyToLocation={locateState} />
        </div>

        <RightSideBar
          missingPersons={missingPersons}
          onUpdateLocate={handleLocateEvent}
        />
      </div>
    </div>
  );
}
