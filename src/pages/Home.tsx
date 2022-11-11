import MessageListItem from "../components/MessageListItem";
import { useState } from "react";
import usuarioStatic, {
  Message,
  getMessages,
  LocalService,
} from "../data/messages";
import {
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import styles from "./Home.module.scss";
import { ModalView } from "../components/ModalView";
import { fileTrayStackedOutline } from "ionicons/icons";

const datos = LocalService;
const Home: React.FC = () => {
  // const data = getMessages();
  const [messages, setMessages] = useState(datos);
  const [results, setResults] = useState(messages);
  const [handlerMessage, setHandlerMessage] = useState(false);
  const [roleMessage, setRoleMessage] = useState('');
  const [presentAlert] = useIonAlert();
  const LocalStorageValues = Array.from(
    JSON.parse(localStorage.getItem("Storage") || JSON.stringify([]))
  );
  const CargaDatosMassivo = async()=>{
    // console.log(`http://200.7.249.20/vision360ServicioCliente/Api_rest_movil/controller/categoria.php?op=pullMassive&data=${JSON.stringify(
    //         localStorage
    //       )}`);
    // console.log(LocalStorageValues);
    LocalStorageValues.map(async (e)=>{
        try {
          await fetch(
            `http://200.7.249.20/vision360ServicioCliente/Api_rest_movil/controller/categoria.php?op=pull&data=${JSON.stringify(
              e
            )}`
          );
        } catch {
          console.log("error");
        }
    });
    localStorage.setItem("Storage",JSON.stringify([]));
  }
  // LocalStorageValues ? setloadData(true) : setloadData(false);
  messages.length == 0 && usuarioStatic
    ? setTimeout(() => {
        window.location.reload();
      }, 100)
    : console.log("");

  const search = (e: any) => {
    const searchTerm = e.currentTarget.value;
    if (searchTerm !== "") {
      const newResult = (messages as unknown as any[]).filter((e) =>
        e.cedulaCliente.includes(searchTerm)
      );
      setResults(newResult);
    } else {
      setResults(messages);
    }
  };
  const showAlert = () => {
    console.log("dentro");
  };

  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      {!usuarioStatic ? (
        <ModalView />
      ) : (
        <IonContent fullscreen>
          <div className={styles.mainContent}>
            <IonCardSubtitle className={styles.results}>
              Tienes {LocalStorageValues?.length}{" "}
              {LocalStorageValues?.length === 1 ? "Registro" : "Registros"}
                -- sin enviar
              {LocalStorageValues.length>0 ? <IonIcon
                icon={fileTrayStackedOutline}
                color="warning"
                onClick={() =>
                  presentAlert({
                    header: 'Todos los resgitros que estan sin enviar se registraran ¿estas de acuerdo?',
                    buttons: [
                      {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                          setHandlerMessage(false);
                        },
                      },
                      {
                        text: 'Si',
                        role: 'confirm',
                        handler: () => {
                          CargaDatosMassivo();
                        },
                      },
                    ],
                    onDidDismiss: (e: CustomEvent) => setRoleMessage(`Dismissed with role: ${e.detail.role}`),
                  })
                }
              ></IonIcon>
                : <IonText hidden></IonText>
            }
            </IonCardSubtitle>
            <IonSearchbar
              onKeyUp={(e) => search(e)}
              onKeyPress={(e) => search(e)}
              placeholder="Buscar..."
              slot="end"
            />
            <IonList>
              {(results as unknown as any[]).map((m, index) => (
                <MessageListItem key={index} message={m} />
              ))}
            </IonList>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Home;
