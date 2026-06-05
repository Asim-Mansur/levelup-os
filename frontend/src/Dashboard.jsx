import { useState } from "react";
import ActivityForm from "./ActivityForm";
import Profile from "./Profile";
import History from "./History";

function Dashboard() {
  const [refreshProfile, setRefreshProfile] =
    useState(0);

  const [refreshHistory, setRefreshHistory] =
    useState(0);

  return (
    <div>
      <Profile refreshTrigger={refreshProfile} />

      <ActivityForm
        onActivityLogged={() => {
          setRefreshProfile(
            (prev) => prev + 1
          );

          setRefreshHistory(
            (prev) => prev + 1
          );
        }}
      />

      <History
        refreshTrigger={refreshHistory}
      />
    </div>
  );
}

export default Dashboard;