import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ListarChamadosFinalizados = async () => {
    try {
        const colecaoChamados = collection(db, "chamados");
        const q = query(colecaoChamados, where('status', '==', 'finalizado'));

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

export default ListarChamadosFinalizados;