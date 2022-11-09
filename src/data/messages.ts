export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}
const usuarioStatic = localStorage.getItem("Gestor");
if (usuarioStatic) {
  fetch(`http://200.7.249.20/vision360ServicioCliente/Api_rest_movil/controller/categoria.php?op=user&nombre=${JSON.parse(usuarioStatic)}`)
  .then(response => response.json())
  .then(data => localStorage.setItem("UsuariosMes",JSON.stringify(data)));
} else {
  console.log("nofunciono");
}

export var LocalService = JSON.parse(localStorage.getItem("UsuariosMes") || JSON.stringify([]));
// LocalService ? LocalService=JSON.parse(localStorage.getItem("UsuariosMes") || "") : console.log("existe")
// const arrayStorage:any;

// console.log(typeof Object.entries(LocalService));
const v = Object.entries(LocalService);
const Total:any = [];
v.map((m)=>{
  Total.push(m[1])
});

// console.log(Total);


const messages: Message[] = [
  {
    fromName: "Matt Chorsey",
    subject: "New event: Trip to Vegas",
    date: "9:32 AM",
    id: 0,
  },
  {
    fromName: "Lauren Ruthford",
    subject: "Long time no chat",
    date: "6:12 AM",
    id: 1,
  },
  {
    fromName: "Jordan Firth",
    subject: "Report Results",
    date: "4:55 AM",
    id: 2,
  },
  {
    fromName: "Bill Thomas",
    subject: "The situation",
    date: "Yesterday",
    id: 3,
  },
  {
    fromName: "Joanne Pollan",
    subject: "Updated invitation: Swim lessons",
    date: "Yesterday",
    id: 4,
  },
  {
    fromName: "Andrea Cornerston",
    subject: "Last minute ask",
    date: "Yesterday",
    id: 5,
  },
  {
    fromName: "Moe Chamont",
    subject: "Family Calendar - Version 1",
    date: "Last Week",
    id: 6,
  },
  {
    fromName: "Kelly Richardson",
    subject: "Placeholder Headhots",
    date: "Last Week",
    id: 7,
  },
];


export const getMessages = () => messages;
export default usuarioStatic;
export let getMessage = (id:number) => (Total as unknown as any[]).find((m)=>m.cedulaCliente == id);
