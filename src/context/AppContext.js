import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const SEED = [
    { id: '1', category: 'buraco', description: 'Buraco grande na faixa da direita, perigoso para motos.', address: 'Av. Paulista, São Paulo', photo: null, status: 'Em análise', createdAt: '2026-09-28T10:00:00Z' },
    { id: '2', category: 'iluminacao', description: 'Poste apagado há mais de uma semana.', address: 'R. Tito, São Paulo', photo: null, status: 'Enviado', createdAt: '2026-10-01T19:30:00Z' },
];

export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [reports, setReports] = useState(SEED);

    // TODO: trocar por chamadas à API/backend (mesma base da versão web)
    const login = async (email, password) => {
        if (!email.includes('@') || password.length < 4) throw new Error('E-mail ou senha inválidos.');
        setUser({ name: email.split('@')[0], email });
    };
    const register = async (name, email, password) => {
        if (!name.trim() || !email.includes('@') || password.length < 4) {
            throw new Error('Preencha nome, e-mail válido e senha (mín. 4 caracteres).');
        }
        setUser({ name: name.trim(), email });
    };
    const logout = () => setUser(null);

    const addReport = (data) => {
        const report = { id: String(Date.now()), status: 'Enviado', createdAt: new Date().toISOString(), ...data };
        setReports((prev) => [report, ...prev]);
        return report;
    };

    return (
        <AppContext.Provider value={{ user, reports, login, register, logout, addReport }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
