import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Network.css'

const NetworkView = ({networkStatus, connectedWithInternet}: any) => {
    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Network</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <div className="mainContent">
                <div>
                    <div>
                        Using Network Plugin we can moniter netowrk status, along with current state of the network
                    </div>
                    <div>
                        Network: {networkStatus}
                    </div>
                    <div>
                        Connected with Internet: {connectedWithInternet?'Yes':'No'}
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
    );
  };
  
  export default NetworkView;