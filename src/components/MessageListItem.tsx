import {
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { idCardOutline} from "ionicons/icons";
import styles from "./MessageListItem.module.scss";

const MessageListItem: React.FC<any> = ({ message }) => {
  const {
    cedulaCliente,
    nombreCliente,
  } = message;

  return (
    // <IonItem routerLink={`/message/${cedulaCliente}`} detail={false}>
    //   <div slot="start" className="dot"><IonIcon icon={apertureOutline} color="primary"></IonIcon></div>
    //   <IonLabel className="ion-text-wrap">
    //     <h2>
    //       {nombreCliente.substring(0,20)}
    //       <span className="date">
    //         <IonNote>{saldoCartera}</IonNote>
    //       </span>
    //     </h2>
    //     <h3>{genericoProducto}</h3>
    //     <p>
    //         {coutasPendientes}
    //     </p>
    //   </IonLabel>
    // </IonItem>
    <IonItem
      routerLink={`/message/${cedulaCliente}`} detail={false}
      className={` ${styles.employeeItem} animate__animated animate__fadeIn`}
      lines="none"
    >
      <IonIcon icon={idCardOutline} color="success"></IonIcon>

      <IonLabel>
        <h2>{nombreCliente}</h2>
        <p>{cedulaCliente}</p>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
