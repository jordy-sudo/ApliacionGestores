import MessageListItem from "../components/MessageListItem";
import { useState } from "react";
import usuarioStatic, { Message, getMessages, LocalService } from "../data/messages";
import {
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./Home.module.scss";
import { ModalView } from "../components/ModalView";

const datos = LocalService;
const Home: React.FC = () => {
  
  // const data = getMessages();
  const [messages, setMessages] = useState(datos);
  const [ results, setResults ] = useState(messages);
  // console.log(messages);
  
  // const search = (e : any) => {
	// 	const searchTerm = e.currentTarget.value;
	// 	if (searchTerm !== "") {
	// 		const searchTermLower = searchTerm.toLowerCase();
	// 		const newResults = messages.filter(e => e.id.toString().includes(searchTermLower));
  //     newResults.length > 0 ? setResults(newResults) : setResults([{
  //       fromName: 'No existe usuario con la busqueda',
  //       subject: '',
  //       date: '',
  //       id: 0 
  //     }]);
	// 	}else{
  //     setResults(messages);
  //   }
	// }
  const search = (e : any) => {
    const searchTerm = e.currentTarget.value;
    if (searchTerm !== "") {
        const newResult = (messages as unknown as any[]).filter(e=>e.cedulaCliente.includes(searchTerm));
        setResults(newResult);
    }else{
      setResults(messages);
    }
    
  }

  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuarios a Gestionar</IonTitle>
        </IonToolbar>
      </IonHeader>
      {!usuarioStatic ? <ModalView/> : 
      <IonContent fullscreen>
        <div className={styles.mainContent}>
          <IonCardSubtitle className={styles.results}>
          </IonCardSubtitle>
          <IonSearchbar
            onKeyUp={(e) => search(e)}
            onKeyPress={(e) => search(e)}
            placeholder="Search..."
            slot="end"
          />
          <IonList>
            {(results as unknown as any[]).map((m,index) => (
              <MessageListItem key={index} message={m} />       
            ))}
          </IonList>
        </div>
      </IonContent>
      }
    </IonPage>
  );
};

export default Home;
