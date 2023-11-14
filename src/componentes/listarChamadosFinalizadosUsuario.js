import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const ListarChamadosFinalizadosUsuario = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        const q = query(collection(db, 'chamados'), 
        where('solicitante', '==', user.email),
        where('status', '==', 'finalizado'));
                const chamadoSnapshot = await getDocs(q);
        const listaChamados = chamadoSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return listaChamados;
    } catch (error) {
        console.error("Erro ao listar chamados: ", error);
        throw error;
    }
};

export default ListarChamadosFinalizadosUsuario;