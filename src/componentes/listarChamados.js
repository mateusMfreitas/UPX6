import { getDocs, collection } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const ListarChamados = async () => {
    try {
        const colecaoChamados = collection(db, "chamados");
        const chamadoSnapshot = await getDocs(colecaoChamados);
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

export default ListarChamados;