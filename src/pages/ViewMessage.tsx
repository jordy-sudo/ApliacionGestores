import { useEffect, useState } from "react";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import {  getMessage } from "../data/messages";
import {
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
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSlide,
  IonSlides,
  IonText,
  IonTextarea,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  cartOutline,
  chatboxEllipsesOutline,
  locationOutline,
  create
} from "ionicons/icons";

import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import styles from "./ViewMessage.module.scss";


interface LocationError {
  showError: boolean;
  message?: string;
}

function ViewMessage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const params = useParams<{ id: string }>();
  const [form, setForm] = useState({
    cedula: 0,
    operacion: 0,
    gestion: "",
    cobranza: "",
    observacion: "",
    contacto: "",
    plazoNuevo: 0,
    valorRenegocio: 0,
    latitud: 0,
    longitud: 0,
    gestor: "",
  });
  const {
    gestion,
    cobranza,
    observacion,
    contacto,
    plazoNuevo,
    valorRenegocio,
  } = form;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<LocationError>({ showError: false });
  const [postion, setPosition] = useState<Geoposition>();
  const [postForm, setPostForm] = useState<boolean>(false);
  const [option, setOptions] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
  });
  const msg = getMessage(parseInt(params.id, 10));
  const getLocation = async () => {
    setLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
      setForm({
        ...form,
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
      });
      setLoading(false);
      setError({ showError: false, message: undefined });
    } catch (e: any) {
      const message =
        e.message.length > 0
          ? e.message
          : "No se pudo obtener las coordenadas verifica los permisos";
      setError({ showError: true, message });
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);
  const onChangeForm = (e: any) => {
    const gestorIN = JSON.parse(localStorage.getItem("Gestor") || "");
    const cedula = cedulaCliente;
    const op = numeroCredito;
    const { name, value } = e.target;
    if (name == "gestion") {
      switch (value) {
        case "Renegociación":
          setOptions({
            value1: "Renegociación valor 0",
            value2: "Renegociación abono",
            value3: "Renegociación",
            value4: "",
          });
          break;
        case "Gestion Cobranzas":
          setOptions({
            value1: "Visita contactada",
            value2: "Visita no contactada",
            value3: "Pago",
            value4: "",
          });
          break;
        case "Recojo":
          setOptions({
            value1: "Recojo",
            value2: "Recojo con abono",
            value3: "",
            value4: "",
          });
          break;
        case "Verificación":
          setOptions({
            value1: "Exitosa",
            value2: "No Exitosa",
            value3: "",
            value4: "",
          });
          break;
        case "Matriculación":
          setOptions({
            value1: "Exitosa",
            value2: "No Exitosa",
            value3: "",
            value4: "",
          });
          break;
      }
    }
    setForm({
      ...form,
      [name]: value,
      cedula: cedula,
      operacion: op,
      gestor: gestorIN,
    });
  };
  const {
    nombreCliente,
    cedulaCliente,
    coutasPendientes,
    direccionReferencia,
    genericoProducto,
    plazoOperacion,
    saldoCartera,
    telDomicilio,
    valorCuota,
    numeroCredito,
  } = msg;
  const outputForm = async (e: any) => {
    e.preventDefault();
    setPostForm(true);
    if(isOnline){
      try {
        await fetch(
          `http://200.7.249.20/vision360ServicioCliente/Api_rest_movil/controller/categoria.php?op=pull&data=${JSON.stringify(
            form
          )}`
        );
      } catch {}
    }else{
      var local = [];
      var dataInLocalStorage = localStorage.getItem("Storage");
      if(dataInLocalStorage){
        local = Array.from(JSON.parse(dataInLocalStorage));
        local.push(form);
        localStorage.setItem("Storage", JSON.stringify(local));        
      }else{
        localStorage.setItem("Storage",JSON.stringify(form));    
      }
    }
    
  };

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Regresar" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {msg ? (
          <>
            <IonContent className={styles.home}>
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
                                        {telDomicilio == undefined
                                          ? "No posee"
                                          : `${
                                              telDomicilio.substring(0, 1) == 0
                                                ? telDomicilio
                                                : 0 +
                                                  telDomicilio.substring(0, 9)
                                            }`}
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
                                        {!coutasPendientes
                                          ? "no posee"
                                          : coutasPendientes}
                                      </IonCardTitle>
                                      <IonCardSubtitle>
                                        Cuotas Pendientes
                                      </IonCardSubtitle>
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                              </IonRow>                
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
                            <IonIcon
                              icon={chatboxEllipsesOutline}
                              color="secondary"
                            />
                            <IonCardSubtitle>Gestion</IonCardSubtitle>
                          </IonRow>                        
                        </IonCardHeader>
                        <IonCardContent>
                          <form onSubmit={outputForm}>
                            <IonList>
                              <IonItem>
                                <IonSelect
                                  placeholder="Tipo De Gestion"
                                  interface="action-sheet"
                                  name="gestion"
                                  value={gestion}
                                  onIonChange={onChangeForm}
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
                              <IonItem id="rene">
                                <IonSelect
                                  interface="action-sheet"
                                  placeholder="Gestion Cobranzas"
                                  name="cobranza"
                                  value={cobranza}
                                  onIonChange={onChangeForm}
                                >
                                  <IonSelectOption value={option.value1}>
                                    {option.value1}
                                  </IonSelectOption>
                                  <IonSelectOption value={option.value2}>
                                    {option.value2}
                                  </IonSelectOption>
                                  {option.value3 ? (
                                    <IonSelectOption value={option.value3}>
                                      {option.value3}
                                    </IonSelectOption>
                                  ) : (
                                    ""
                                  )}
                                  {option.value4 ? (
                                    <IonSelectOption value={option.value4}>
                                      {option.value4}
                                    </IonSelectOption>
                                  ) : (
                                    ""
                                  )}
                                </IonSelect>
                              </IonItem>
                              {gestion == "Renegociación" ? (
                                <IonItem>
                                  <IonRow>
                                    <IonCol size="6">
                                      <IonLabel position="floating">
                                        Nuevo Plazo
                                      </IonLabel>
                                      <IonInput
                                        type="text"
                                        name="plazoNuevo"
                                        value={plazoNuevo}
                                        onIonChange={onChangeForm}
                                      ></IonInput>
                                    </IonCol>
                                    <IonRow>
                                      <IonCol>
                                        <IonLabel position="floating">
                                          Valor Renegocio
                                        </IonLabel>
                                        <IonInput
                                          type="text"
                                          name="valorRenegocio"
                                          value={valorRenegocio}
                                          onIonChange={onChangeForm}
                                        ></IonInput>
                                      </IonCol>
                                    </IonRow>
                                  </IonRow>
                                </IonItem>
                              ) : (
                                <IonItemDivider hidden />
                              )}
                              <IonItem>
                                <IonTextarea
                                  placeholder="Observacion y detalle de la Gestion"
                                  clearOnEdit={true}
                                  name="observacion"
                                  value={observacion}
                                  onIonChange={onChangeForm}
                                ></IonTextarea>
                              </IonItem>
                              <IonItem>
                                <IonSelect
                                  placeholder="Tipo De Contacto"
                                  interface="action-sheet"
                                  name="contacto"
                                  value={contacto}
                                  onIonChange={onChangeForm}
                                >
                                  <IonSelectOption value="Contactado">
                                    Contactado
                                  </IonSelectOption>
                                  <IonSelectOption value="No Contactado">
                                    No Contactado
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                              <IonItem>
                                <IonLoading
                                  isOpen={loading}
                                  message={"Obteniendo cordenadas..."}
                                  onDidDismiss={() => setLoading(false)}
                                />
                                <IonToast
                                  isOpen={error.showError}
                                  message={error.message}
                                  onDidDismiss={() =>
                                    setError({
                                      message: undefined,
                                      showError: false,
                                    })
                                  }
                                  duration={3000}
                                />
                                {/* <IonButton onClick={getLocation}>
                                  Obtener Coordenadas...
                                </IonButton> */}
                                <IonLabel color="medium"> Obtener coordenadas</IonLabel>
                                <IonIcon icon={locationOutline} slot="end" onClick={getLocation}></IonIcon>
                                {postion ? (
                                  <IonItem>
                                    <IonInput
                                      type="text"
                                      name="latitud"
                                      value={postion.coords.latitude}
                                      onIonChange={onChangeForm}
                                    ></IonInput>
                                    <IonInput
                                      type="text"
                                      value={postion.coords.longitude}
                                      name="longitud"
                                      onIonChange={onChangeForm}
                                    ></IonInput>
                                  </IonItem>
                                ) : (
                                  <IonText hidden></IonText>
                                )}
                              </IonItem>
                            </IonList>
                            <IonToast
                              isOpen={postForm}
                              message={"Registro Ingresado correctamente"}
                              onDidDismiss={()=>setPostForm(false)}
                              duration={3000}
                            />
                            <IonButtons slot="primary" className={styles.IconSubmit}>
                              <IonButton fill="outline">
                                Registar
                                <IonIcon slot="end" icon={create}></IonIcon>
                              </IonButton>
                            </IonButtons>
                           
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
            </IonContent>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
