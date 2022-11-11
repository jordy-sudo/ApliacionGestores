import {Geolocation,Geoposition} from "@ionic-native/geolocation";
import { IonButton, IonInput, IonItem, IonLoading, IonText, IonToast } from "@ionic/react";
import React, { useState } from "react";

interface LocationError{
    showError:boolean;
    message?:string
}

const GeolocationBtn: React.FC=()=>{
    const [loading,setLoading]= useState<boolean>(false);
    const [error,setError] = useState<LocationError>({showError:false});
    const [postion,setPosition] = useState<Geoposition>();
    const getLocation = async()=>{
        setLoading(true);
        try{
            const position = await Geolocation.getCurrentPosition();
            setPosition(position);
            setLoading(false);
            setError({showError:false , message:undefined});
        }catch (e:any){
            const message = e.message.length > 0 ? e.message :"No se pudo obtener las coordenadas verifica los permisos";
            setError({showError:true,message});
            setLoading(false);
        }
    }
    return(
        <>
            <IonLoading 
                isOpen={loading}
                message={"Obteniendo cordenadas..."}
                onDidDismiss={()=>setLoading(false)}
            />
            <IonToast
                isOpen={error.showError}
                message={error.message}
                onDidDismiss={()=>setError({message:undefined, showError:false})}
                duration={3000}
            />
            <IonButton onClick={getLocation}>
                Obtener Coordenadas...
            </IonButton>
            
            {postion?
                <IonItem>
                    <IonInput type="text" value={postion.coords.latitude} name="latitud"></IonInput>
                    <IonInput type="text" value={postion.coords.longitude} name="longitud"></IonInput>
                </IonItem>
                : <IonText>''</IonText>
            }
            
        </>
    )
}
export default GeolocationBtn