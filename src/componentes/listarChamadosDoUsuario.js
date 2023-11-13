import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const ListarChamadosDoUsuario = async () => {
    try {
        // Crie uma consulta que busca apenas os chamados do usuário atual
        const chamadosQuery = query(
            collection(db, "chamados"),
            where("criadorId", "==", {username}) //trocar o criadorId
        );

        const chamadoSnapshot = await getDocs(chamadosQuery);

        // Mapeie os documentos para um array
        const listaChamados = chamadoSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return listaChamados;
    } catch (error) {
        console.error("Erro ao listar chamados do usuário: ", error);
        throw error;
    }
};

export default ListarChamadosDoUsuario;