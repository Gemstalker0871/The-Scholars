import React from "react";
import { ConnectButton } from "./web3/ConnectButton";
import { TossContractInteractions } from "./web3/TossInteractions";
import ProfilePage from "./PofilePage";

function App() {
  return (
    <>
     
        <ConnectButton />
        <div>
          {/* <TossContractInteractions /> */}
          <ProfilePage />
        </div>
      
    </>
  );
}

export default App;
