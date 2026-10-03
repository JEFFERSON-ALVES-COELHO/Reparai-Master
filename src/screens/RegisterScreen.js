import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Input } from '../components/ui';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function RegisterScreen() {
    const { register } = useApp();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        try { await register(name, email.trim(), password); } catch (e) { Alert.alert('Ops', e.message); }
        setLoading(false);
    };

    return (
        <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
            <Text style={s.title}>Crie sua conta</Text>
            <Input label="Nome" value={name} onChangeText={setName} placeholder="Seu nome" />
            <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="voce@email.com" />
            <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="Mínimo 4 caracteres" />
            <Button title="Cadastrar" onPress={submit} loading={loading} />
        </ScrollView>
    );
}

const s = StyleSheet.create({
    container: { padding: 24 },
    title: { fontSize: 24, fontWeight: '800', color: colors.primary, marginBottom: 20 },
});
