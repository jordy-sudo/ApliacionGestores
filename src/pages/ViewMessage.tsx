import { useState } from "react";
import { Message, getMessage } from "../data/messages";
import {
  IonAccordion,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSlide,
  IonSlides,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  arrowBackOutline,
  arrowForward,
  bookmarkOutline,
  cartOutline,
  chatboxEllipsesOutline,
  ellipsisHorizontal,
  imageOutline,
  personAddOutline,
} from "ionicons/icons";

import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import styles from "./ViewMessage.module.scss";

function ViewMessage() {
  const [message, setMessage] = useState<Message>();
  const params = useParams<{ id: string }>();
  const msg = getMessage(parseInt(params.id, 10));
  // console.log(msg);
  useIonViewWillEnter(() => {
    setMessage(msg);
  });
  const {
    nombreCliente,
    cedulaCliente,
    coutasPendientes,
    direccionReferencia,
    genericoProducto,
    plazoOperacion,
    saldoCartera,
    telDomicilio,
    usuario,
    valorCuota,
    numeroCredito,
  } = msg;
  const changeSelectValues = (e: any) => {
    const valor = e.target.value;
    const element: HTMLElement = document.getElementById(
      "gestion"
    ) as HTMLElement;
    // console.log(element);
    return (element.innerHTML = `<IonSelect placeholder="Gestion Cobranza"></IonSelect>`);

    // switch (valor) {
    //   case 'Renegociación':
    //     element.innerHTML=`<IonSelect><IonSelectOption value="Renegociación valor 0">Renegociación valor 0</IonSelectOption>
    //     <IonSelectOption value="Renegociación abono">Renegociación abono</IonSelectOption>
    //     <IonSelectOption value="Renegociación">Renegociación</IonSelectOption></IonSelect>`;
    //     break;
    //   case 'Gestión Cobranza':
    //     element.innerHTML=`<IonSelectOption value="Visita contactada">Visita contactada</IonSelectOption>
    //     <IonSelectOption value="Visita no contactada">Visita no contactada</IonSelectOption>
    //     <IonSelectOption value="Pago">Pago</IonSelectOption>`;
    //     break;
    //   case 'Recojo' :
    //     element.innerHTML=`<IonSelectOption value="Recojo">Recojo</IonSelectOption>
    //     <IonSelectOption value="Recojo con abono">Recojo con abono</IonSelectOption>`;
    //     break;
    //   case 'Verificación' :
    //     element.innerHTML=`<IonSelectOption value="Exitosa">Exitosa</IonSelectOption>
    //     <IonSelectOption value="No Exitosa">No Exitosa</IonSelectOption>`;
    //     break;
    //   case 'Matriculación' :
    //     element.innerHTML=`<IonSelectOption value="Exitosa">Exitosa</IonSelectOption>
    //     <IonSelectOption value="No Exitosa">No Exitosa</IonSelectOption>`;
    //     break;
    //   default:
    //     element.innerHTML=`''`;
    //     break;
    // }
  };

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <>
            <IonPage className={styles.home}>
              <IonHeader>
                <IonToolbar></IonToolbar>
              </IonHeader>
              <IonContent>
                <div className={styles.topHeader}></div>

                <IonGrid>
                  <IonRow className="ion-justify-content-center">
                    <IonCol
                      size="12"
                      className="ion-justify-content-center ion-align-items-center ion-text-center"
                    >
                      <IonSlides>
                        <IonSlide>
                          <IonCard className={styles.profileHeader}>
                            <IonCardContent>
                              <IonRow>
                                <IonCol size="4">
                                  <IonIcon
                                    icon={personCircle}
                                    color="secondary"
                                    id="avatar"
                                  ></IonIcon>
                                </IonCol>

                                <IonCol size="8">
                                  <IonRow className={styles.profileInfo}>
                                    <IonCol size="12">
                                      <IonText
                                        color="dark"
                                        className={styles.profileName}
                                      >
                                        <p>
                                          <strong>{nombreCliente}</strong>
                                        </p>
                                      </IonText>
                                      <IonText color="medium">
                                        <p>CI: {cedulaCliente}</p>
                                      </IonText>
                                    </IonCol>
                                  </IonRow>

                                  <IonRow className={styles.profileStats}>
                                    <IonCol className={styles.profileStat}>
                                      <IonCardTitle>
                                        {telDomicilio.substring(0, 1) == 0
                                          ? telDomicilio
                                          : 0 + telDomicilio.substring(0, 8)}
                                      </IonCardTitle>
                                      <IonCardSubtitle>Celular</IonCardSubtitle>
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                              </IonRow>
                              <IonRow className={styles.profileStats}>
                                <IonCol className={styles.profileStat}>
                                  <IonCardTitle>
                                          {direccionReferencia}
                                  </IonCardTitle>
                            
                                </IonCol>
                              </IonRow>
                              {/* <IonRow>
                            <IonCol size="12">
                                <IonList role="feed">
                                  <IonItem role="article">
                                        {direccionReferencia}
                                  </IonItem>
                                </IonList>
                            </IonCol>
                            <IonCol size="6">
                              <IonButton color="primary" expand="block">
                                <IonIcon icon={personAddOutline} size="small" />
                                &nbsp; Follow
                              </IonButton>
                            </IonCol>
                          </IonRow> */}
                            </IonCardContent>
                          </IonCard>
                        </IonSlide>
                        <IonSlide>
                          <IonCard className={styles.profileHeader}>
                            <IonCardContent>
                              <IonRow>
                                <IonCol size="4 ">
                                  <IonIcon
                                    icon={cartOutline}
                                    color="success"
                                    id="avatar"
                                  ></IonIcon>
                                </IonCol>

                                <IonCol size="8">
                                  <IonRow className={styles.profileInfo}>
                                    <IonCol size="12">
                                      <IonText
                                        color="dark"
                                        className={styles.profileName}
                                      >
                                        <p>
                                          <strong>{genericoProducto}</strong>
                                        </p>
                                      </IonText>
                                      <IonText color="medium">
                                        <p>N*: {numeroCredito}</p>
                                      </IonText>
                                    </IonCol>
                                  </IonRow>

                                  <IonRow className={styles.profileStats}>
                                    <IonCol
                                      className={styles.profileStat}
                                      size="6"
                                    >
                                      <IonCardTitle>
                                        {saldoCartera}
                                      </IonCardTitle>
                                      <IonCardSubtitle>
                                        Saldo Cartera
                                      </IonCardSubtitle>
                                    </IonCol>
                                    <IonCol className={styles.profileStat}>
                                      <IonCardTitle>{valorCuota}</IonCardTitle>
                                      <IonCardSubtitle>
                                        Valor Cuota
                                      </IonCardSubtitle>
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                                <IonCol>
                                  <IonRow className={styles.profileStats}>
                                    <IonCol
                                      className={styles.profileStat}
                                      size="6"
                                    >
                                      <IonCardTitle>
                                        {plazoOperacion.substring(0, 3)}
                                      </IonCardTitle>
                                      <IonCardSubtitle>
                                        Plazo operacion
                                      </IonCardSubtitle>
                                    </IonCol>
                                    <IonCol className={styles.profileStat}>
                                      <IonCardTitle>
                                        {coutasPendientes.substring(0, 3)}
                                      </IonCardTitle>
                                      <IonCardSubtitle>
                                        Cuotas Pendientes
                                      </IonCardSubtitle>
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                              </IonRow>

                              {/* <IonRow>
                            <IonCol size="12">
                                <IonList role="feed">
                                  <IonItem role="article">
                                        {direccionReferencia}
                                  </IonItem>
                                </IonList>
                            </IonCol>
                            <IonCol size="6">
                              <IonButton color="primary" expand="block">
                                <IonIcon icon={personAddOutline} size="small" />
                                &nbsp; Follow
                              </IonButton>
                            </IonCol>
                          </IonRow> */}
                            </IonCardContent>
                          </IonCard>
                        </IonSlide>
                      </IonSlides>
                    </IonCol>
                  </IonRow>

                  <IonRow className={styles.profileStatusContainer}>
                    <IonCol size="12">
                      <IonCard className={styles.profileCard}>
                        <IonCardHeader>
                          <IonRow className={styles.profileStatus}>
                            <IonIcon icon={chatboxEllipsesOutline}  color="secondary"/>
                            <IonCardSubtitle>Gestion</IonCardSubtitle>
                          </IonRow>
                        </IonCardHeader>
                        <IonCardContent>
                          <form>
                            <IonList>
                              <IonItem>
                                <IonSelect
                                  placeholder="Tipo De Gestion"
                                  interface="action-sheet"
                                  onIonChange={(e) => changeSelectValues(e)}
                                >
                                  <IonSelectOption value="Renegociación">
                                    Renegociación
                                  </IonSelectOption>
                                  <IonSelectOption value="Gestión Cobranza">
                                    Gestión Cobranza
                                  </IonSelectOption>
                                  <IonSelectOption value="Recojo">
                                    Recojo
                                  </IonSelectOption>
                                  <IonSelectOption value="Verificación">
                                    Verificación
                                  </IonSelectOption>
                                  <IonSelectOption value="Matriculación">
                                    Matriculación
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                              <IonItem id="gestion"></IonItem>
                            </IonList>
                          </form>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow>

                  {/* <IonRow>
                    <IonCol size="6">
                      <IonCard className={styles.profileCard}>
                        <IonCardContent>
                          <IonIcon icon={imageOutline} />
                          <IonCardTitle>147</IonCardTitle>
                          <IonCardSubtitle>Photos</IonCardSubtitle>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>

                    <IonCol size="6">
                      <IonCard className={styles.profileCard}>
                        <IonCardContent>
                          <IonIcon icon={bookmarkOutline} />
                          <IonCardTitle>63</IonCardTitle>
                          <IonCardSubtitle>Bookmarks</IonCardSubtitle>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow>

                  <IonRow className={styles.profileActionContainer}>
                    <IonCol size="12">
                      <IonCard className={styles.profileActionCard}>
                        <IonCardContent>
                          <IonRow className="ion-justify-content-between">
                            <IonCardSubtitle>
                              View latest project
                            </IonCardSubtitle>
                            <IonIcon icon={arrowForward} />
                          </IonRow>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow> */}
                </IonGrid>
              </IonContent>
            </IonPage>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
